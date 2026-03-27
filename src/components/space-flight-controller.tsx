import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import type { Group, Vector3Tuple } from "three";
import { Vector3 } from "three";

type SpaceFlightControllerProps = {
	shipRef: RefObject<Group | null>;
	planetStopsRef: { current: Vector3Tuple[] };
	planetCenter: Vector3Tuple;
	planetRadius: number;
	onStageChange: (stage: number) => void;
	onWarpStateChange: (isWarping: boolean) => void;
};

const FORWARD_ACCELERATION = 18;
const BRAKE_DECELERATION = 14;
const YAW_SPEED = 1.85;
const PITCH_SPEED = 1.4;
const MAX_SPEED = 28;
const WARP_DURATION_SECONDS = 0.45;
const BOUNDS = 260;
const CAMERA_HEIGHT = 2.6;
const CAMERA_DISTANCE = 11;
const CAMERA_SENSITIVITY = 0.0048;
const CAMERA_RETURN_SPEED = 3.8;
const CAMERA_DEFAULT_PITCH = -0.06;
const SHIP_COLLISION_BUFFER = 2.8;
const MAX_PITCH = 0.65;
const MAX_CAMERA_PITCH = 0.45;
const MIN_CAMERA_PITCH = -0.55;
const BANK_ANGLE = 0.28;

const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(max, value));

export default function SpaceFlightController({
	shipRef,
	planetStopsRef,
	planetCenter,
	planetRadius,
	onStageChange,
	onWarpStateChange,
}: SpaceFlightControllerProps) {
	const { camera, gl } = useThree();
	const pressedKeys = useRef<Set<string>>(new Set());
	const isDragging = useRef(false);
	const currentStopIndex = useRef(0);
	const currentStage = useRef(1);
	const cameraTarget = useRef(new Vector3(0, 0, 0));
	const currentSpeed = useRef(0);
	const shipYaw = useRef(0);
	const shipPitch = useRef(0);
	const shipBank = useRef(0);
	const cameraYawOffset = useRef(0);
	const cameraPitchOffset = useRef(CAMERA_DEFAULT_PITCH);
	const collisionCenter = useRef(new Vector3(...planetCenter));
	const nextPosition = useRef(new Vector3());
	const collisionNormal = useRef(new Vector3());
	const shipForward = useRef(new Vector3(0, 0, -1));
	const shipUp = useRef(new Vector3(0, 1, 0));
	const shipRight = useRef(new Vector3(1, 0, 0));
	const cameraLookDirection = useRef(new Vector3(0, 0, -1));
	const warp = useRef<{
		active: boolean;
		elapsed: number;
		from: Vector3Tuple;
		to: Vector3Tuple;
	}>({
		active: false,
		elapsed: 0,
		from: [0, 0, 0],
		to: [0, 0, 0],
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			if (target?.closest("input, textarea, [contenteditable='true']")) {
				return;
			}

			pressedKeys.current.add(event.key);

			const planetStops = planetStopsRef.current;
			if (!planetStops.length) return;

			if (event.key === "Shift" && shipRef.current && !warp.current.active) {
				const nextIndex = (currentStopIndex.current + 1) % planetStops.length;
				const nextStop = planetStops[nextIndex];

				currentStopIndex.current = nextIndex;
				warp.current.active = true;
				warp.current.elapsed = 0;
				warp.current.from = [
					shipRef.current.position.x,
					shipRef.current.position.y,
					shipRef.current.position.z,
				];
				warp.current.to = [nextStop[0], nextStop[1], nextStop[2]];
				onWarpStateChange(true);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			pressedKeys.current.delete(event.key);
		};
		const handlePointerDown = (event: PointerEvent) => {
			if (event.button !== 0) return;
			isDragging.current = true;
			gl.domElement.style.cursor = "grabbing";
		};
		const handlePointerUp = () => {
			isDragging.current = false;
			gl.domElement.style.cursor = "grab";
		};
		const handlePointerMove = (event: PointerEvent) => {
			if (!isDragging.current) return;

			cameraYawOffset.current -= event.movementX * CAMERA_SENSITIVITY;
			cameraPitchOffset.current = clamp(
				cameraPitchOffset.current - event.movementY * CAMERA_SENSITIVITY * 0.65,
				MIN_CAMERA_PITCH,
				MAX_CAMERA_PITCH,
			);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointercancel", handlePointerUp);
		gl.domElement.addEventListener("pointerdown", handlePointerDown);
		gl.domElement.addEventListener("pointermove", handlePointerMove);
		gl.domElement.style.cursor = "grab";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerUp);
			gl.domElement.removeEventListener("pointerdown", handlePointerDown);
			gl.domElement.removeEventListener("pointermove", handlePointerMove);
			gl.domElement.style.cursor = "";
		};
	}, [gl.domElement, onWarpStateChange, planetStopsRef, shipRef]);

	useEffect(() => {
		collisionCenter.current.set(...planetCenter);
	}, [planetCenter]);

	useFrame((_, delta) => {
		if (!shipRef.current) return;
		const planetStops = planetStopsRef.current;

		const ship = shipRef.current;
		ship.rotation.order = "YXZ";

		if (warp.current.active) {
			warp.current.elapsed += delta;
			const t = Math.min(warp.current.elapsed / WARP_DURATION_SECONDS, 1);
			const eased = 1 - (1 - t) ** 3;

			ship.position.set(
				warp.current.from[0] +
					(warp.current.to[0] - warp.current.from[0]) * eased,
				warp.current.from[1] +
					(warp.current.to[1] - warp.current.from[1]) * eased,
				warp.current.from[2] +
					(warp.current.to[2] - warp.current.from[2]) * eased,
			);

			if (t >= 1) {
				warp.current.active = false;
				onWarpStateChange(false);
			}
		} else {
			const keys = pressedKeys.current;
			const isPitchUpPressed = keys.has("ArrowUp");
			const isPitchDownPressed = keys.has("ArrowDown");
			const isYawLeftPressed = keys.has("ArrowLeft");
			const isYawRightPressed = keys.has("ArrowRight");
			const isThrustPressed = keys.has(" ");

			if (isPitchUpPressed) {
				shipPitch.current = clamp(
					shipPitch.current + PITCH_SPEED * delta,
					-MAX_PITCH,
					MAX_PITCH,
				);
			}
			if (isPitchDownPressed) {
				shipPitch.current = clamp(
					shipPitch.current - PITCH_SPEED * delta,
					-MAX_PITCH,
					MAX_PITCH,
				);
			}
			if (isYawLeftPressed) {
				shipYaw.current += YAW_SPEED * delta;
			}
			if (isYawRightPressed) {
				shipYaw.current -= YAW_SPEED * delta;
			}

			if (isThrustPressed) {
				currentSpeed.current = clamp(
					currentSpeed.current + FORWARD_ACCELERATION * delta,
					0,
					MAX_SPEED,
				);
			} else {
				currentSpeed.current = Math.max(
					0,
					currentSpeed.current - BRAKE_DECELERATION * delta,
				);
			}

			const bankTarget =
				(isYawLeftPressed ? BANK_ANGLE : 0) +
				(isYawRightPressed ? -BANK_ANGLE : 0);
			shipBank.current +=
				(bankTarget - shipBank.current) * Math.min(1, delta * 5.5);
			ship.rotation.set(
				shipPitch.current,
				shipYaw.current,
				shipBank.current,
				"YXZ",
			);

			shipForward.current.set(0, 0, -1).applyQuaternion(ship.quaternion);
			nextPosition.current.set(
				clamp(
					ship.position.x +
						shipForward.current.x * currentSpeed.current * delta,
					-BOUNDS,
					BOUNDS,
				),
				clamp(
					ship.position.y +
						shipForward.current.y * currentSpeed.current * delta,
					-BOUNDS,
					BOUNDS,
				),
				clamp(
					ship.position.z +
						shipForward.current.z * currentSpeed.current * delta,
					-BOUNDS,
					BOUNDS,
				),
			);

			const collisionRadius = planetRadius + SHIP_COLLISION_BUFFER;
			const nextDistance = nextPosition.current.distanceTo(
				collisionCenter.current,
			);

			if (nextDistance < collisionRadius) {
				collisionNormal.current
					.subVectors(nextPosition.current, collisionCenter.current)
					.normalize()
					.multiplyScalar(collisionRadius)
					.add(collisionCenter.current);
				nextPosition.current.copy(collisionNormal.current);
				currentSpeed.current *= 0.3;
			}

			ship.position.x = nextPosition.current.x;
			ship.position.y = nextPosition.current.y;
			ship.position.z = nextPosition.current.z;
		}

		if (planetStops.length) {
			let nearestIndex = 0;
			let nearestDistance = Number.POSITIVE_INFINITY;
			for (let i = 0; i < planetStops.length; i += 1) {
				const stop = planetStops[i];
				const dx = ship.position.x - stop[0];
				const dy = ship.position.y - stop[1];
				const dz = ship.position.z - stop[2];
				const distance = dx * dx + dy * dy + dz * dz;

				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearestIndex = i;
				}
			}

			currentStopIndex.current = nearestIndex;
			const stage = nearestIndex + 1;
			if (stage !== currentStage.current) {
				currentStage.current = stage;
				onStageChange(stage);
			}
		}

		const keys = pressedKeys.current;
		const isControlling =
			keys.has("ArrowUp") ||
			keys.has("ArrowDown") ||
			keys.has("ArrowLeft") ||
			keys.has("ArrowRight") ||
			keys.has(" ") ||
			currentSpeed.current > 0.15;

		if (isControlling) {
			cameraYawOffset.current +=
				(0 - cameraYawOffset.current) *
				Math.min(1, delta * CAMERA_RETURN_SPEED);
			cameraPitchOffset.current +=
				(CAMERA_DEFAULT_PITCH - cameraPitchOffset.current) *
				Math.min(1, delta * CAMERA_RETURN_SPEED);
		}

		shipForward.current
			.set(0, 0, -1)
			.applyQuaternion(ship.quaternion)
			.normalize();
		shipUp.current.set(0, 1, 0).applyQuaternion(ship.quaternion).normalize();
		shipRight.current.set(1, 0, 0).applyQuaternion(ship.quaternion).normalize();

		cameraLookDirection.current.copy(shipForward.current);
		cameraLookDirection.current.applyAxisAngle(
			shipUp.current,
			cameraYawOffset.current,
		);
		cameraLookDirection.current.applyAxisAngle(
			shipRight.current,
			cameraPitchOffset.current,
		);
		cameraLookDirection.current.normalize();

		cameraTarget.current
			.copy(ship.position)
			.addScaledVector(cameraLookDirection.current, -CAMERA_DISTANCE)
			.addScaledVector(shipUp.current, CAMERA_HEIGHT);
		camera.position.lerp(cameraTarget.current, 0.1);
		camera.lookAt(
			ship.position.x + cameraLookDirection.current.x * 18,
			ship.position.y + cameraLookDirection.current.y * 18,
			ship.position.z + cameraLookDirection.current.z * 18,
		);
	});

	return null;
}
