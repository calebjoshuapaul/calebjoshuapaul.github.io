import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Cta from "../components/cta";
import { experiences, skills } from "../constants";

export default function About() {
	return (
		<section className="max-container">
			<h1 className="head-text">
				Hello I'm{" "}
				<span className="blue-gradient_text font-semibold drop-shadow">
					Caleb Joshua
				</span>
			</h1>

			<div className="mt-5 flex flex-col gap-3 text-slate-500">
				<p>
					A Javascript developer based in Bangalore with a strong interest in
					projects that require both conceptual and analytical thinking.
				</p>
			</div>

			<div className="flex flex-col py-10">
				<h3 className="subhead-text">My Skills</h3>
				<div className="mt-16 flex flex-wrap gap-12">
					{skills.map((skill) => (
						<div className="flex flex-col gap-3" key={skill.name}>
							<div className="block-container h-20 w-20">
								<div className="btn-back rounded-xl" />
								<div className="btn-front flex items-center justify-center rounded-xl">
									<img
										src={skill.imageUrl}
										alt={skill.name}
										className="h-1/2 w-1/2 object-contain"
									/>
								</div>
							</div>
							<p className="font-semibold">{skill.name}</p>
						</div>
					))}
				</div>
			</div>

			<div className="py-16">
				<h3 className="subhead-text">Work Experience</h3>
				<div className="mt-5 flex flex-col gap-3 text-slate-500">
					<p>
						Passionate and results-driven frontend engineer with nearly 2 years
						of delivering high-quality web applications. Demonstrated ability to
						craft intuitive and efficient user interfaces, enhancing user
						engagement and satisfaction. Specializes in collaborative
						environments, contributing expertise while embracing continuous
						learning and innovation. Proactive mindset and commitment to
						excellence poised to tackle new challenges and drive meaningful
						contributions to dynamic teams and projects.
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
									borderBottom: "8px",
									borderStyle: "solid",
									borderBottomColor: experience.iconBg,
									boxShadow: "none",
								}}
							>
								<div>
									<h3 className="font-poppins text-xl font-semibold text-black">
										{experience.title}
									</h3>
									<p className="m-0 font-base font-medium text-black-500">
										{experience.companyName}
									</p>
								</div>
								<ul className="my-5 ml-5 list-disc space-y-2">
									{experience.points.map((point) => (
										<li
											key={`${experience.title}-${point}`}
											className="pl-1 text-sm font-normal text-black-500/50"
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
			<hr className="border-slate-200" />
			<Cta />
		</section>
	);
}
