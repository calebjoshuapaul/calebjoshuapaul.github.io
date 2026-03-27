import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import type { Group, Vector3Tuple } from "three";
import { Vector3 } from "three";

type SpaceFlightControllerProps = {
	shipRef: RefObject<Group | null>;
	planetStops: Vector3Tuple[];
	onStageChange: (stage: number) => void;
	onWarpStateChange: (isWarping: boolean) => void;
};

const NORMAL_SPEED = 8;
const WARP_DURATION_SECONDS = 0.45;
const BOUNDS = 120;

export default function SpaceFlightController({
	shipRef,
	planetStops,
	onStageChange,
	onWarpStateChange,
}: SpaceFlightControllerProps) {
	const { camera } = useThree();
	const pressedKeys = useRef<Set<string>>(new Set());
	const currentStopIndex = useRef(0);
	const currentStage = useRef(1);
	const cameraTarget = useRef(new Vector3(0, 0, 0));
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

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [onWarpStateChange, planetStops, shipRef]);

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
			let moveX = 0;
			let moveZ = 0;
			const keys = pressedKeys.current;

			if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) moveZ -= 1;
			if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) moveZ += 1;
			if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) moveX -= 1;
			if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) moveX += 1;

			if (moveX !== 0 || moveZ !== 0) {
				const length = Math.hypot(moveX, moveZ) || 1;
				const vx = (moveX / length) * NORMAL_SPEED * delta;
				const vz = (moveZ / length) * NORMAL_SPEED * delta;

				ship.position.x = Math.max(
					-BOUNDS,
					Math.min(BOUNDS, ship.position.x + vx),
				);
				ship.position.z = Math.max(
					-BOUNDS,
					Math.min(BOUNDS, ship.position.z + vz),
				);

				ship.rotation.y = Math.atan2(moveX, -moveZ);
			}
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

		const targetCameraX = ship.position.x;
		const targetCameraY = ship.position.y + 2.8;
		const targetCameraZ = ship.position.z + 8;
		cameraTarget.current.set(targetCameraX, targetCameraY, targetCameraZ);
		camera.position.lerp(cameraTarget.current, 0.08);
		camera.lookAt(ship.position.x, ship.position.y, ship.position.z);
	});

	return null;
}
