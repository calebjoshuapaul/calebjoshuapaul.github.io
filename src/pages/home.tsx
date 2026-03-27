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
			[0, 0, -70],
			[42, 0, -40],
			[-40, 0, -30],
			[-58, 0, -95],
		],
		[],
	);

	return (
		<section className="relative h-screen w-full bg-slate-950">
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
					<color attach="background" args={["#020b1a"]} />
					<ambientLight intensity={0.38} />
					<hemisphereLight intensity={0.35} groundColor="#020617" />
					<pointLight position={[0, 12, 0]} intensity={14} color="#fef3c7" />
					<pointLight position={[28, -8, 18]} intensity={4} color="#ef4444" />
					<directionalLight position={[-24, 16, -14]} intensity={0.95} />
					<SolarSystem scale={[3, 3, 3]} position={[0, -2.5, -70]} />
					<SpaceShip
						shipRef={shipRef}
						scale={[0.12, 0.12, 0.12]}
						position={[18, 0, 14]}
					/>
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
