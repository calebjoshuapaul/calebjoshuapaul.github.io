import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	// base: "/calebjoshuapaul.github.io/",
	baseDirectory: "/dist",
	plugins: [react()],
	assetsInclude: ["**/*.glb"],
});
