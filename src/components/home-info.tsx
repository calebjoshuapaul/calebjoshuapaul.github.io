import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import arrow from "../assets/icons/arrow.svg";

type InfoBoxProps = {
	text: string;
	link: string;
	btnText: string;
};

function InfoBox({ text, link, btnText }: InfoBoxProps) {
	return (
		<div className="info-box">
			<p className="text-center font-medium sm:text-xl">{text}</p>
			<Link className="neo-brutalism-white neo-btn" to={link}>
				{btnText}
				<img src={arrow} alt="arrow" className="h-4 w-4 object-contain" />
			</Link>
		</div>
	);
}

const renderContent: Record<number, ReactNode> = {
	1: (
		<div className="neo-brutalism-blue">
			<h1 className="mx-5 px-8 py-4 text-center text-white sm:text-xl sm:leading-snug">
				Hi, I am <span className="font-semibold">Caleb</span>👋
				<br />A Software Engineer from Bangalore
			</h1>
			<p className="text-center text-xs font-semibold text-white/70">
				(Hint: Use arrow keys or mouse to navigate)
			</p>
			<br />
		</div>
	),
	2: (
		<InfoBox
			text="A web enthusiast who is keen on learning everything related to the web"
			link={"/about"}
			btnText={"Learn More"}
		/>
	),
	3: (
		<InfoBox
			text="Worked on a lot of projects and have a lot of experience in web development"
			link={"/projects"}
			btnText={"View my projects"}
		/>
	),
	4: (
		<InfoBox
			text="Need a project done or looking for a dev? I'm just a few keystrokes away."
			link={"/contact"}
			btnText={"Let's talk"}
		/>
	),
};

type HomeInfoProps = {
	currentStage: number;
};

export default function HomeInfo({ currentStage }: HomeInfoProps) {
	return renderContent[currentStage] || null;
}
