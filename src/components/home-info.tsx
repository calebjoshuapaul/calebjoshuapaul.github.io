import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type InfoBoxProps = {
	eyebrow: string;
	text: string;
	link: string;
	btnText: string;
};

function InfoBox({ eyebrow, text, link, btnText }: InfoBoxProps) {
	return (
		<div className="info-box">
			<p className="font-barlow text-sm uppercase tracking-[0.45em] text-yellow-400/70">
				{eyebrow}
			</p>
			<p className="text-center font-barlow text-2xl uppercase tracking-[0.12em] text-slate-100 sm:text-3xl">
				{text}
			</p>
			<Link className="neo-btn" to={link}>
				{btnText}
				<span aria-hidden="true">{" >"}</span>
			</Link>
		</div>
	);
}

const renderContent: Record<number, ReactNode> = {
	1: (
		<div className="info-box">
			<p className="font-barlow text-sm uppercase tracking-[0.5em] text-yellow-400/70">
				Flight Deck
			</p>
			<h1 className="text-center font-orbitron text-3xl uppercase tracking-[0.14em] text-yellow-100 sm:text-4xl">
				Caleb Joshua
			</h1>
			<p className="max-w-xl text-center font-barlow text-xl uppercase tracking-[0.12em] text-slate-200 sm:text-2xl">
				Software engineer navigating product builds from Bangalore.
			</p>
			<p className="text-center font-barlow text-base uppercase tracking-[0.3em] text-slate-400">
				Arrow keys rotate. Space thrusts. Drag to inspect the sector.
			</p>
		</div>
	),
	2: (
		<InfoBox
			eyebrow="Sector Two"
			text="Pilot dossier, skills, and service record."
			link={"/about"}
			btnText={"Enter About"}
		/>
	),
	3: (
		<InfoBox
			eyebrow="Sector Three"
			text="Mission archive with selected builds and launches."
			link={"/projects"}
			btnText={"Open Projects"}
		/>
	),
	4: (
		<InfoBox
			eyebrow="Sector Four"
			text="Transmit a brief when you need a pilot on the build."
			link={"/contact"}
			btnText={"Open Contact"}
		/>
	),
};

type HomeInfoProps = {
	currentStage: number;
};

export default function HomeInfo({ currentStage }: HomeInfoProps) {
	return renderContent[currentStage] || null;
}
