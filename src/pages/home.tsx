import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import type { Group } from "three";

import HomeInfo from "../components/home-info";
import Loader from "../components/loader";
import SpaceFlightController from "../components/space-flight-controller";
import SolarSystem from "../models/solar-system";
import SpaceShip from "../models/space-ship";

type Vec3 = [number, number, number];

export default function Home() {
	const [currentStage, setCurrentStage] = useState(1);
	const [isWarping, setIsWarping] = useState(false);
	const shipRef = useRef<Group | null>(null);

	const planetStops = useMemo<Vec3[]>(
		() => [
			[24, 0, 0],
			[5, 0, -32],
			[-24, 0, -6],
			[18, 0, 30],
		],
		[],
	);

	return (
		<section className="relative h-screen w-full">
			<div className="absolute left-0 right-0 top-28 z-10 flex items-center justify-center">
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>
			<div
				className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-200 ${
					isWarping ? "warp-overlay opacity-100" : "opacity-0"
				}`}
			/>

			<Canvas
				className="h-screen w-full bg-transparent"
				camera={{ near: 0.1, far: 1000, position: [0, 3, 10] }}
			>
				<Suspense fallback={<Loader />}>
					<ambientLight intensity={0.35} />
					<pointLight position={[0, 0, 0]} intensity={6} color="#f8fafc" />
					<directionalLight position={[15, 8, 5]} intensity={1.2} />
					<SolarSystem scale={[0.12, 0.12, 0.12]} position={[0, -2, 0]} />
					<SpaceShip shipRef={shipRef} scale={[0.02, 0.02, 0.02]} />
					<SpaceFlightController
						shipRef={shipRef}
						planetStops={planetStops}
						onStageChange={setCurrentStage}
						onWarpStateChange={setIsWarping}
					/>
				</Suspense>
			</Canvas>
		</section>
	);
}
