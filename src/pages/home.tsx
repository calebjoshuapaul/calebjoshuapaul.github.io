import { Html, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Group } from "three";

import HomeInfo from "../components/home-info";
import Loader from "../components/loader";
import SpaceFlightController from "../components/space-flight-controller";
import SolarSystem from "../models/solar-system";
import SpaceShip from "../models/space-ship";

type Vec3 = [number, number, number];
type Sector = {
	label: string;
	link: string;
	position: Vec3;
};

const PLANET_POSITION: Vec3 = [0, -2.5, -70];
const PLANET_RADIUS = 18.5;

function PlanetBeacon({
	isActive,
	label,
	onSelect,
	position,
}: {
	isActive: boolean;
	label: string;
	onSelect: () => void;
	position: Vec3;
}) {
	return (
		<group position={position}>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: react-three-fiber meshes use raycast events, not DOM interaction semantics. */}
			<mesh
				onClick={(event) => {
					event.stopPropagation();
					onSelect();
				}}
			>
				<cylinderGeometry args={[0.14, 0.2, 5.4, 12]} />
				<meshStandardMaterial
					color={isActive ? "#f5d36b" : "#f97316"}
					emissive={isActive ? "#facc15" : "#fb7185"}
					emissiveIntensity={isActive ? 2.2 : 1.25}
				/>
			</mesh>
			<mesh position={[0, 3.2, 0]}>
				<sphereGeometry args={[0.7, 24, 24]} />
				<meshStandardMaterial
					color={isActive ? "#fde68a" : "#fca5a5"}
					emissive={isActive ? "#fde047" : "#fb7185"}
					emissiveIntensity={isActive ? 3.2 : 1.75}
				/>
			</mesh>
			<Html center distanceFactor={12} position={[0, 5.8, 0]}>
				<button className="space-pin" onClick={onSelect} type="button">
					{label}
				</button>
			</Html>
		</group>
	);
}

export default function Home() {
	const navigate = useNavigate();
	const [currentStage, setCurrentStage] = useState(1);
	const [isWarping, setIsWarping] = useState(false);
	const shipRef = useRef<Group | null>(null);

	const sectors = useMemo<Sector[]>(
		() => [
			{
				label: "Home",
				link: "/",
				position: [0, 0, -38],
			},
			{
				label: "About",
				link: "/about",
				position: [30, 0, -64],
			},
			{
				label: "Projects",
				link: "/projects",
				position: [-28, 0, -78],
			},
			{
				label: "Contact",
				link: "/contact",
				position: [-6, 0, -100],
			},
		],
		[],
	);
	const planetStops = useMemo<Vec3[]>(
		() => sectors.map((sector) => sector.position),
		[sectors],
	);

	return (
		<section className="relative h-screen w-full overflow-hidden">
			<div className="absolute inset-x-0 top-24 z-10 flex items-center justify-center px-5">
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>
			<div className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-[min(92vw,38rem)] -translate-x-1/2 rounded-full border border-yellow-500/25 bg-slate-950/60 px-5 py-3 text-center font-barlow text-lg uppercase tracking-[0.35em] text-yellow-100/80 shadow-[0_0_45px_rgba(245,211,107,0.1)] backdrop-blur-md">
				Drag to steer. W/S thrust. A/D adjust yaw. Space boost. Shift jumps
				beacons.
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
					<color attach="background" args={["#01030a"]} />
					<fog attach="fog" args={["#01030a", 110, 260]} />
					<Stars
						radius={280}
						depth={140}
						count={7000}
						factor={6}
						fade
						speed={0.8}
					/>
					<ambientLight intensity={0.22} />
					<hemisphereLight
						intensity={0.4}
						groundColor="#020617"
						color="#8ab4ff"
					/>
					<pointLight position={[0, 12, -48]} intensity={16} color="#ffe8a3" />
					<pointLight
						position={[28, -8, -18]}
						intensity={4.5}
						color="#fb7185"
					/>
					<directionalLight
						position={[-24, 16, -14]}
						intensity={1.1}
						color="#cbd5ff"
					/>
					<SolarSystem scale={[3.2, 3.2, 3.2]} position={PLANET_POSITION} />
					{sectors.map((sector, index) => (
						<PlanetBeacon
							key={sector.label}
							isActive={currentStage === index + 1}
							label={sector.label}
							onSelect={() => navigate(sector.link)}
							position={sector.position}
						/>
					))}
					<SpaceShip
						shipRef={shipRef}
						scale={[0.12, 0.12, 0.12]}
						position={[0, 0, -38]}
					/>
					<SpaceFlightController
						shipRef={shipRef}
						planetStops={planetStops}
						planetCenter={PLANET_POSITION}
						planetRadius={PLANET_RADIUS}
						onStageChange={setCurrentStage}
						onWarpStateChange={setIsWarping}
					/>
				</Suspense>
			</Canvas>
		</section>
	);
}
