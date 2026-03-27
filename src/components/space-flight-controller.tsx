import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import type { Group, Vector3Tuple } from "three";
import { Vector3 } from "three";

type SpaceFlightControllerProps = {
	shipRef: RefObject<Group | null>;
	planetStops: Vector3Tuple[];
	planetCenter: Vector3Tuple;
	planetRadius: number;
	onStageChange: (stage: number) => void;
	onWarpStateChange: (isWarping: boolean) => void;
};

const FORWARD_ACCELERATION = 18;
const REVERSE_ACCELERATION = 10;
const TURN_SPEED = 2.7;
const ROTATION_RESPONSE = 4.8;
const MAX_SPEED = 24;
const MAX_REVERSE_SPEED = -9;
const DRAG_WHEN_COASTING = 0.94;
const WARP_DURATION_SECONDS = 0.45;
const BOUNDS = 260;
const CAMERA_SENSITIVITY = 0.0054;
const SHIP_COLLISION_BUFFER = 2.8;

const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(max, value));
const normalizeAngle = (angle: number) =>
	Math.atan2(Math.sin(angle), Math.cos(angle));

export default function SpaceFlightController({
	shipRef,
	planetStops,
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
	const steerYaw = useRef(0);
	const cameraPitch = useRef(-0.22);
	const collisionCenter = useRef(new Vector3(...planetCenter));
	const nextPosition = useRef(new Vector3());
	const collisionNormal = useRef(new Vector3());
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

			steerYaw.current -= event.movementX * CAMERA_SENSITIVITY;
			cameraPitch.current = clamp(
				cameraPitch.current - event.movementY * CAMERA_SENSITIVITY * 0.65,
				-0.7,
				0.4,
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
	}, [gl.domElement, onWarpStateChange, planetStops, shipRef]);

	useEffect(() => {
		collisionCenter.current.set(...planetCenter);
	}, [planetCenter]);

	useFrame((_, delta) => {
		if (!shipRef.current) return;
		if (!planetStops.length) return;

		const ship = shipRef.current;

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
			const isForwardPressed =
				keys.has("ArrowUp") || keys.has("w") || keys.has("W");
			const isReversePressed =
				keys.has("ArrowDown") || keys.has("s") || keys.has("S");
			const isTurnLeftPressed =
				keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
			const isTurnRightPressed =
				keys.has("ArrowRight") || keys.has("d") || keys.has("D");
			const isBoostPressed = keys.has(" ");

			if (isTurnLeftPressed) {
				steerYaw.current += TURN_SPEED * delta;
			}
			if (isTurnRightPressed) {
				steerYaw.current -= TURN_SPEED * delta;
			}

			const angleToTarget = normalizeAngle(steerYaw.current - ship.rotation.y);
			ship.rotation.y += angleToTarget * Math.min(1, delta * ROTATION_RESPONSE);

			if (isForwardPressed) {
				const boostMultiplier = isBoostPressed ? 1.65 : 1;
				currentSpeed.current = clamp(
					currentSpeed.current + FORWARD_ACCELERATION * boostMultiplier * delta,
					MAX_REVERSE_SPEED,
					MAX_SPEED * boostMultiplier,
				);
			} else if (isReversePressed) {
				currentSpeed.current = clamp(
					currentSpeed.current - REVERSE_ACCELERATION * delta,
					MAX_REVERSE_SPEED,
					MAX_SPEED,
				);
			} else {
				currentSpeed.current *= DRAG_WHEN_COASTING;
			}

			const forwardX = Math.sin(ship.rotation.y);
			const forwardZ = -Math.cos(ship.rotation.y);
			nextPosition.current.set(
				clamp(
					ship.position.x + forwardX * currentSpeed.current * delta,
					-BOUNDS,
					BOUNDS,
				),
				ship.position.y,
				clamp(
					ship.position.z + forwardZ * currentSpeed.current * delta,
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
			ship.position.z = nextPosition.current.z;
		}

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

		const cameraDistance = 12;
		const baseHeight = 3.6;
		const cameraForwardX = Math.sin(ship.rotation.y);
		const cameraForwardZ = -Math.cos(ship.rotation.y);
		const pitchOffsetY = Math.sin(cameraPitch.current) * 4;
		const targetCameraX = ship.position.x - cameraForwardX * cameraDistance;
		const targetCameraY = ship.position.y + baseHeight + pitchOffsetY;
		const targetCameraZ = ship.position.z - cameraForwardZ * cameraDistance;
		cameraTarget.current.set(targetCameraX, targetCameraY, targetCameraZ);
		camera.position.lerp(cameraTarget.current, 0.1);
		ship.rotation.z = clamp(
			normalizeAngle(steerYaw.current - ship.rotation.y) * 0.45,
			-0.38,
			0.38,
		);
		ship.position.y = Math.sin(performance.now() * 0.0025) * 0.35;
		camera.lookAt(
			ship.position.x + cameraForwardX * 18,
			ship.position.y + 1.5 + pitchOffsetY * 0.35,
			ship.position.z + cameraForwardZ * 18,
		);
	});

	return null;
}
