import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
		<Toaster />
	</React.StrictMode>,
);
