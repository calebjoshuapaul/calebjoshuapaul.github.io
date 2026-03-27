import { Html, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Group, Quaternion, Vector3Tuple } from "three";
import { Quaternion as ThreeQuaternion, Vector3 } from "three";

import HomeInfo from "../components/home-info";
import Loader from "../components/loader";
import SpaceFlightController from "../components/space-flight-controller";
import SolarSystem from "../models/solar-system";
import SpaceShip from "../models/space-ship";

type Vec3 = [number, number, number];
type Sector = {
	label: string;
	link: string;
	localNormal: Vec3;
};

const PLANET_POSITION: Vec3 = [0, -2.5, -70];
const PLANET_RADIUS = 24;
const PIN_SURFACE_RADIUS = 8.4;
const PIN_HEIGHT = 5.2;
const PIN_STOP_OFFSET = 3.8;

const UP_AXIS = new Vector3(0, 1, 0);

function PlanetBeacon({
	stopRef,
	isActive,
	label,
	onSelect,
	surfaceNormal,
}: {
	stopRef: (instance: Group | null) => void;
	isActive: boolean;
	label: string;
	onSelect: () => void;
	surfaceNormal: Vec3;
}) {
	const bounceRef = useRef<Group | null>(null);
	const bouncePhase = useMemo(() => Math.random() * Math.PI * 2, []);
	const surfaceDirection = useMemo(() => {
		return new Vector3(...surfaceNormal).normalize();
	}, [surfaceNormal]);
	const surfacePosition = useMemo<Vector3Tuple>(() => {
		const pinnedPosition = surfaceDirection
			.clone()
			.multiplyScalar(PIN_SURFACE_RADIUS);
		return [pinnedPosition.x, pinnedPosition.y, pinnedPosition.z];
	}, [surfaceDirection]);
	const beaconQuaternion = useMemo<Quaternion>(() => {
		return new ThreeQuaternion().setFromUnitVectors(UP_AXIS, surfaceDirection);
	}, [surfaceDirection]);

	useFrame(({ clock }) => {
		if (!bounceRef.current) return;
		bounceRef.current.position.y =
			PIN_HEIGHT + Math.sin(clock.elapsedTime * 2.4 + bouncePhase) * 0.45;
	});

	return (
		<group
			position={surfacePosition}
			quaternion={beaconQuaternion}
		>
			<mesh position={[0, PIN_HEIGHT / 2, 0]}>
				<cylinderGeometry args={[0.12, 0.18, PIN_HEIGHT, 12]} />
				<meshStandardMaterial
					color={isActive ? "#f5d36b" : "#f97316"}
					emissive={isActive ? "#facc15" : "#fb7185"}
					emissiveIntensity={isActive ? 2.2 : 1.25}
				/>
			</mesh>
			<group
				position={[0, PIN_HEIGHT + PIN_STOP_OFFSET, 0]}
				ref={stopRef}
			/>
			<group ref={bounceRef}>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: react-three-fiber meshes use raycast events, not DOM interaction semantics. */}
				<mesh
					onClick={(event) => {
						event.stopPropagation();
						onSelect();
					}}
				>
					<sphereGeometry args={[0.68, 24, 24]} />
					<meshStandardMaterial
						color={isActive ? "#fde68a" : "#fca5a5"}
						emissive={isActive ? "#fde047" : "#fb7185"}
						emissiveIntensity={isActive ? 3.2 : 1.75}
					/>
				</mesh>
				<Html
					center
					distanceFactor={12}
					position={[0, 2.6, 0]}
				>
					<button
						className="space-pin"
						onClick={onSelect}
						type="button"
					>
						{label}
					</button>
				</Html>
			</group>
		</group>
	);
}

function BeaconStopTracker({
	stopRefs,
	planetStopsRef,
}: {
	stopRefs: React.MutableRefObject<Array<Group | null>>;
	planetStopsRef: React.MutableRefObject<Vec3[]>;
}) {
	const worldPosition = useRef(new Vector3());

	useFrame(() => {
		planetStopsRef.current = stopRefs.current
			.map((stopRef) => {
				if (!stopRef) return null;
				stopRef.getWorldPosition(worldPosition.current);
				return [
					worldPosition.current.x,
					worldPosition.current.y,
					worldPosition.current.z,
				] as Vec3;
			})
			.filter((stop): stop is Vec3 => stop !== null);
	});

	return null;
}

export default function Home() {
	const navigate = useNavigate();
	const [currentStage, setCurrentStage] = useState(1);
	const [isWarping, setIsWarping] = useState(false);
	const shipRef = useRef<Group | null>(null);
	const solarSystemRef = useRef<Group | null>(null);
	const stopRefs = useRef<Array<Group | null>>([]);
	const planetStopsRef = useRef<Vec3[]>([]);

	const sectors = useMemo<Sector[]>(
		() => [
			{
				label: "Home",
				link: "/",
				localNormal: [0.06, 0.2, 1],
			},
			{
				label: "About",
				link: "/about",
				localNormal: [0.92, 0.24, 0.3],
			},
			{
				label: "Projects",
				link: "/projects",
				localNormal: [-0.86, 0.16, -0.42],
			},
			{
				label: "Contact",
				link: "/contact",
				localNormal: [-0.18, 0.22, -0.96],
			},
		],
		[],
	);

	return (
		<section className="relative h-screen w-full overflow-hidden">
			<div className="absolute inset-x-0 top-24 z-10 flex items-center justify-center px-5">
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>
			<div className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-[min(92vw,38rem)] -translate-x-1/2 rounded-full border border-yellow-500/25 bg-slate-950/60 px-5 py-3 text-center font-barlow text-lg uppercase tracking-[0.35em] text-yellow-100/80 shadow-[0_0_45px_rgba(245,211,107,0.1)] backdrop-blur-md">
				Drag to look. Arrow keys rotate ship. Space thrusts. Shift jumps
				beacons.
			</div>
			<div
				className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-200 ${
					isWarping ? "warp-overlay opacity-100" : "opacity-0"
				}`}
			/>

			<Canvas
				className="h-screen w-full bg-transparent"
				camera={{ near: 0.1, far: 1000, position: [0, 3.2, -26] }}
			>
				<Suspense fallback={<Loader />}>
					<color
						attach="background"
						args={["#01030a"]}
					/>
					<fog
						attach="fog"
						args={["#01030a", 110, 260]}
					/>
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
					<pointLight
						position={[0, 12, -48]}
						intensity={16}
						color="#ffe8a3"
					/>
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
					<SolarSystem
						scale={[3.2, 3.2, 3.2]}
						position={PLANET_POSITION}
						systemRef={solarSystemRef}
					>
						{sectors.map((sector, index) => (
							<PlanetBeacon
								key={sector.label}
								stopRef={(instance) => {
									stopRefs.current[index] = instance;
								}}
								isActive={currentStage === index + 1}
								label={sector.label}
								onSelect={() => navigate(sector.link)}
								surfaceNormal={sector.localNormal}
							/>
						))}
					</SolarSystem>
					<BeaconStopTracker
						stopRefs={stopRefs}
						planetStopsRef={planetStopsRef}
					/>
					<SpaceShip
						shipRef={shipRef}
						scale={[0.75, 0.75, 0.75]}
						position={[0, 0, 0]}
					/>
					<SpaceFlightController
						shipRef={shipRef}
						planetStopsRef={planetStopsRef}
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
