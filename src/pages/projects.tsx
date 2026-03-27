import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import Cta from "../components/cta";
import { projects } from "../constants";

export default function Projects() {
	return (
		<section className="max-container">
			<h1 className="head-text">
				My{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Projects
				</span>
			</h1>
			<div className="mt-5 flex flex-col gap-3 text-slate-500">
				<p>
					Over the years, I have had the privilege of working on a diverse array
					of projects that have significantly contributed to my professional
					growth and expertise. These projects span various industries and
					disciplines, each presenting unique challenges and opportunities for
					innovation. From leading a team in developing a cutting-edge software
					application that streamlined business processes, to collaborating on a
					community outreach initiative aimed at improving local infrastructure,
					my experiences have been both enriching and multifaceted. Each project
					has not only honed my technical skills but also enhanced my ability to
					work collaboratively, manage time effectively, and adapt to evolving
					project requirements.
				</p>
			</div>

			<div className="my-20 flex flex-wrap gap-16">
				{projects.map((project) => (
					<div className="w-full lg:w-[400px]" key={project.name}>
						<div className="block-container h-12 w-12">
							<div className={`btn-back rounded-xl ${project.theme}`} />
							<div className="btn-front flex items-center justify-center rounded-xl">
								<img
									src={project.iconUrl}
									alt="Project Icon"
									className="h-1/2 w-1/2 object-contain"
								/>
							</div>
						</div>
						<div className="mt-5 flex flex-col">
							<h4 className="font-poppins text-2xl font-semibold">
								{project.name}
							</h4>
							<p className="mt-2 text-slate-500">{project.description}</p>
							<div className="mt-5 flex items-center gap-2 font-poppins">
								<Link
									to={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold"
								>
									Link
								</Link>
								<img
									src={arrow}
									alt="arrow"
									className="h-4 w-4 object-contain"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<hr className="border-slate-200" />

			<Cta />
		</section>
	);
}
