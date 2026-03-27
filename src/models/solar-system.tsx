import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

const solarSystemUrl = new URL("../assets/3d/solar_system.glb", import.meta.url)
	.href;

export default function SolarSystem(props: ThreeElements["group"]) {
	const { scene } = useGLTF(solarSystemUrl);

	return (
		<group {...props}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload(solarSystemUrl);
