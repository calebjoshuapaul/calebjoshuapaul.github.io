import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Cta from "../components/cta";
import { experiences, skills } from "../constants";

export default function About() {
	return (
		<section className="space-section">
			<h1 className="head-text">
				Pilot{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Caleb Joshua
				</span>
			</h1>

			<div className="mt-5 max-w-3xl space-y-3 font-barlow text-2xl uppercase tracking-[0.08em] text-slate-300">
				<p>
					JavaScript engineer focused on product delivery, interface systems,
					and interactive experiences that feel deliberate instead of generic.
				</p>
			</div>

			<div className="flex flex-col py-10">
				<h3 className="subhead-text">My Skills</h3>
				<div className="mt-16 flex flex-wrap gap-12">
					{skills.map((skill) => (
						<div className="flex flex-col gap-3" key={skill.name}>
							<div className="block-container h-20 w-20">
								<div className="btn-back rounded-xl" />
								<div className="btn-front flex items-center justify-center rounded-xl border border-yellow-500/15">
									<img
										src={skill.imageUrl}
										alt={skill.name}
										className="h-1/2 w-1/2 object-contain"
									/>
								</div>
							</div>
							<p className="font-barlow text-lg uppercase tracking-[0.25em] text-slate-200">
								{skill.name}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="py-16">
				<h3 className="subhead-text">Work Experience</h3>
				<div className="mt-5 max-w-4xl space-y-3 font-barlow text-2xl uppercase tracking-[0.08em] text-slate-300">
					<p>
						Frontend and product engineering experience across mission planning,
						analytics, collaboration surfaces, and production web systems.
					</p>
				</div>

				<div className="mt-12 flex">
					<VerticalTimeline>
						{experiences.map((experience) => (
							<VerticalTimelineElement
								key={experience.title}
								date={experience.date}
								icon={
									<div className="flex h-full w-full items-center justify-center">
										<img
											src={experience.icon}
											alt={experience.companyName}
											className="h-[60%] w-[60%] object-contain"
										/>
									</div>
								}
								iconStyle={{ backgroundColor: experience.iconBg }}
								contentStyle={{
									background: "rgba(7, 12, 23, 0.88)",
									border: "1px solid rgba(245, 211, 107, 0.18)",
									borderBottom: "6px solid rgba(245, 211, 107, 0.55)",
									boxShadow: "0 20px 50px rgba(0, 0, 0, 0.28)",
									color: "#e2e8f0",
								}}
							>
								<div>
									<h3 className="font-orbitron text-xl font-semibold uppercase tracking-[0.14em] text-yellow-100">
										{experience.title}
									</h3>
									<p className="m-0 font-barlow text-lg uppercase tracking-[0.18em] text-slate-300">
										{experience.companyName}
									</p>
								</div>
								<ul className="my-5 ml-5 list-disc space-y-2">
									{experience.points.map((point) => (
										<li
											key={`${experience.title}-${point}`}
											className="pl-1 font-barlow text-lg text-slate-300/80"
										>
											{point}
										</li>
									))}
								</ul>
							</VerticalTimelineElement>
						))}
					</VerticalTimeline>
				</div>
			</div>
			<hr className="border-yellow-500/20" />
			<Cta />
		</section>
	);
}
