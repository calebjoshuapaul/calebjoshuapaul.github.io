import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import HomeInfo from "../components/home-info";
import Loader from "../components/loader";
import Bird from "../models/Bird";
import Island from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";

type Vec3 = [number, number, number];

export default function Home() {
	const [isRotating, setIsRotating] = useState(false);
	const [currentStage, setCurrentStage] = useState(1);

	const adjustIslandForScreenSize = (): [Vec3, Vec3, Vec3] => {
		const screenPosition: Vec3 = [0, -6.5, -43];
		const rotation: Vec3 = [0.1, 4.7, 0];
		const screenScale: Vec3 =
			window.innerWidth < 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];

		return [screenScale, screenPosition, rotation];
	};

	const adjustPlaneForScreenSize = (): [Vec3, Vec3] => {
		if (window.innerWidth < 768) {
			return [
				[1.5, 1.5, 1.5],
				[0, -1.5, 0],
			];
		}

		return [
			[3, 3, 3],
			[0, -4, -4],
		];
	};

	const [islandScale, islandPosition, islandRotation] =
		adjustIslandForScreenSize();
	const [planeScale, planePosition] = adjustPlaneForScreenSize();

	return (
		<section className="relative h-screen w-full">
			<div className="absolute left-0 right-0 top-28 z-10 flex items-center justify-center">
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>

			<Canvas
				className={`h-screen w-full bg-transparent ${
					isRotating ? "cursor-grabbing" : "cursor-grab"
				}`}
				camera={{ near: 0.1, far: 1000 }}
			>
				<Suspense fallback={<Loader />}>
					<directionalLight position={[1, 1, 1]} intensity={2} />
					<ambientLight intensity={0.5} />
					<hemisphereLight args={["#b1e1ff", "#000000", 0.5]} />
					<Bird />
					<Sky isRotating={isRotating} />
					<Island
						scale={islandScale}
						isRotating={isRotating}
						position={islandPosition}
						rotation={islandRotation}
						setIsRotating={setIsRotating}
						setCurrentStage={setCurrentStage}
					/>
					<Plane
						scale={planeScale}
						isRotating={isRotating}
						position={planePosition}
						rotation={[0, 20, 0]}
					/>
				</Suspense>
			</Canvas>
		</section>
	);
}
