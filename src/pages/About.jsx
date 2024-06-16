import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences, skills } from "../constants";
import CTA from "../components/CTA";

function About() {
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

			<div className="py-10 flex flex-col">
				<h3 className="subhead-text">My Skills</h3>
				<div className="mt-16 flex flex-wrap gap-12">
					{skills.map((skill) => (
						<div
							className="flex flex-col gap-3"
							key={skill.name}
						>
							<div className="block-container w-20 h-20">
								<div className="btn-back rounded-xl" />
								<div className="btn-front rounded-xl flex justify-center items-center">
									<img
										src={skill.imageUrl}
										alt={skill.name}
										className="w-1/2 h-1/2 object-contain"
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
									<div className="flex justify-center items-center w-full h-full">
										<img
											src={experience.icon}
											alt={experience.company_name}
											className="w-[60%] h-[60%] object-contain"
										/>
									</div>
								}
								iconStyle={{
									backgroundColor: experience.iconBg,
								}}
								contentStyle={{
									borderBottom: "8px",
									borderStyle: "solid",
									borderBottomColor: experience.iconBg,
									boxShadow: "none",
								}}
							>
								<div>
									<h3 className="text-black text-xl font-poppins font-semibold">
										{experience.title}
									</h3>
									<p
										className="text-black-500 font-medium font-base"
										style={{ margin: 0 }}
									>
										{experience.company_name}
									</p>
								</div>
								<ul className="my-5 list-disc ml-5 space-y-2">
									{experience.points.map((point, index) => (
										<li
											key={`exp-${index}`}
											className="text-black-500/50 font-normal pl-1 text-sm"
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
			<CTA />
		</section>
	);
}

export default About;
