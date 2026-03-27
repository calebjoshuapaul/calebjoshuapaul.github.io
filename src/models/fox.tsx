import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

import scene from "../assets/3d/droid.glb";

type FoxProps = {
	currentAnimation: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
};

export default function Fox({ currentAnimation, ...props }: FoxProps) {
	const group = useRef<Group | null>(null);
	const { scene: foxScene, animations } = useGLTF(scene);
	const { actions } = useAnimations(animations, group);
	const fallbackAction = Object.keys(actions)[0];

	useEffect(() => {
		Object.values(actions).forEach((action) => {
			action?.stop();
		});
		actions[currentAnimation]?.play() ?? actions[fallbackAction]?.play();
	}, [actions, currentAnimation, fallbackAction]);

	return (
		<group ref={group} {...props} dispose={null}>
			<primitive object={foxScene} />
		</group>
	);
}
