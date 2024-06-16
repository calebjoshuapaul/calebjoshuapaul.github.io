import { Link } from "react-router-dom";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";

function Projects() {
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

			<div className="flex flex-wrap my-20 gap-16">
				{projects.map((project) => {
					return (
						<div
							className="lg:w-[400px] w-full"
							key={project.name}
						>
							<div className="block-container w-12 h-12">
								<div className={`btn-back rounded-xl ${project.theme}`}></div>
								<div className="btn-front rounded-xl flex justify-center items-center">
									<img
										src={project.iconUrl}
										alt="Project Icon"
										className="w-1/2 h-1/2 object-contain"
									/>
								</div>
							</div>
							<div className="mt-5 flex flex-col">
								<h4 className="text-2xl font-poppins font-semibold">
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
										className="w-4 h-4 object-contain"
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<hr className="border-slate-200" />

			<CTA />
		</section>
	);
}

export default Projects;
