import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import Cta from "../components/cta";
import { projects } from "../constants";

export default function Projects() {
	return (
		<section className="space-section">
			<h1 className="head-text">
				Mission{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Archive
				</span>
			</h1>
			<div className="mt-5 max-w-4xl space-y-3 font-barlow text-2xl uppercase tracking-[0.08em] text-slate-300">
				<p>
					Selected product and web builds, from control consoles to data-driven
					applications and shipping-ready user interfaces.
				</p>
			</div>

			<div className="my-20 flex flex-wrap gap-16">
				{projects.map((project) => (
					<div className="space-card w-full lg:w-[400px]" key={project.name}>
						<div className="block-container h-12 w-12">
							<div className={`btn-back rounded-xl ${project.theme}`} />
							<div className="btn-front flex items-center justify-center rounded-xl border border-yellow-500/15">
								<img
									src={project.iconUrl}
									alt="Project Icon"
									className="h-1/2 w-1/2 object-contain"
								/>
							</div>
						</div>
						<div className="mt-5 flex flex-col">
							<h4 className="font-orbitron text-2xl font-semibold uppercase tracking-[0.12em] text-yellow-100">
								{project.name}
							</h4>
							<p className="mt-4 font-barlow text-xl uppercase leading-7 tracking-[0.08em] text-slate-300/80">
								{project.description}
							</p>
							<div className="mt-6 flex items-center gap-2 font-barlow text-lg uppercase tracking-[0.28em]">
								<Link
									to={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-yellow-300 transition-colors hover:text-yellow-100"
								>
									Inspect
								</Link>
								<img
									src={arrow}
									alt="arrow"
									className="space-arrow h-4 w-4 object-contain"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<hr className="border-yellow-500/20" />

			<Cta />
		</section>
	);
}
