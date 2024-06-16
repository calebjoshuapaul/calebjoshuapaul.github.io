import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";

const InfoBox = ({ text, link, btnText }) => {
	return (
		<div className="info-box">
			<p className="font-medium sm:text-xl text-center">{text}</p>
			<Link
				className="neo-brutalism-white neo-btn"
				to={link}
			>
				{btnText}
				<img
					src={arrow}
					alt="arrow"
					className="w-4 h-4 object-contain"
				/>
			</Link>
		</div>
	);
};
const renderContent = {
	1: (
		<div className="neo-brutalism-blue">
			<h1 className="sm:text-xl sm:leading-snug text-center  py-4 px-8 text-white mx-5">
				Hi, I am <span className="font-semibold">Caleb</span>👋
				<br />A Software Engineer from Bangalore
			</h1>
			<p className="text-center text-xs text-white/70 font-semibold">
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

function HomeInfo({ currentStage }) {
	return renderContent[currentStage] || null;
}

export default HomeInfo;
