import { Html } from "@react-three/drei";

export default function Loader() {
	return (
		<Html>
			<div className="flex items-center justify-center">
				<div className="h-20 w-20 animate-spin rounded-full border-2 border-yellow-400/25 border-t-yellow-300 shadow-[0_0_28px_rgba(250,204,21,0.22)]" />
			</div>
		</Html>
	);
}
