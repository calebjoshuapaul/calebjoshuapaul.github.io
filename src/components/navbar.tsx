import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="header">
			<NavLink
				className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold shadow-md"
				to={"/"}
			>
				<p className="blue-gradient_text">CJ</p>
			</NavLink>
			<nav className="flex gap-7 text-lg font-medium">
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive ? "text-blue-500" : "text-black"
					}
				>
					About
				</NavLink>
				<NavLink
					to="/projects"
					className={({ isActive }) =>
						isActive ? "text-blue-500" : "text-black"
					}
				>
					Projects
				</NavLink>
			</nav>
		</header>
	);
}
