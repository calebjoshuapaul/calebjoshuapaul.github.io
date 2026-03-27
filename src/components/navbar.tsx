import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="header">
			<NavLink
				className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/50 bg-slate-950/80 font-orbitron text-lg font-bold text-yellow-200 shadow-[0_0_24px_rgba(250,204,21,0.18)] backdrop-blur-md"
				to={"/"}
			>
				<p>CJ</p>
			</NavLink>
			<nav className="flex gap-4 font-barlow text-lg uppercase tracking-[0.3em] sm:gap-7">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? "space-nav-link space-nav-link-active" : "space-nav-link"
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive ? "space-nav-link space-nav-link-active" : "space-nav-link"
					}
				>
					About
				</NavLink>
				<NavLink
					to="/projects"
					className={({ isActive }) =>
						isActive ? "space-nav-link space-nav-link-active" : "space-nav-link"
					}
				>
					Projects
				</NavLink>
				<NavLink
					to="/contact"
					className={({ isActive }) =>
						isActive ? "space-nav-link space-nav-link-active" : "space-nav-link"
					}
				>
					Contact
				</NavLink>
			</nav>
		</header>
	);
}
