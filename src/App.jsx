import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

export default function App() {
	return (
		<main className="bg-slate-300/20 h-[100vh]">
			<Router>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/about"
						element={<About />}
					/>
					<Route
						path="/projects"
						element={<Projects />}
					/>
					<Route
						path="/contact"
						element={<Contact />}
					/>
				</Routes>
			</Router>
		</main>
	);
}
