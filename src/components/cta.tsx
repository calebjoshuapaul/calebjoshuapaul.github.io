import { Link } from "react-router-dom";

export default function Cta() {
	return (
		<section className="cta">
			<p className="cta-text">
				Have a mission in mind? <br className="hidden sm:block" />
				Open a transmission and let&apos;s build it.
			</p>
			<Link to={"/contact"} className="btn">
				Open Channel
			</Link>
		</section>
	);
}
