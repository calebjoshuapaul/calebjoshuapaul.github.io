import {
	contact,
	cryptotracker,
	css,
	ecommsite,
	express,
	git,
	github,
	html,
	javascript,
	linkedin,
	mongodb,
	motion,
	mui,
	nextconsole,
	nextjs,
	nodejs,
	react,
	redux,
	sass,
	spaceXlog,
	tailwindcss,
	typescript,
} from "../assets/icons";
import thinkusableLogo from "../assets/images/thinkusable.png";
import urbanmatrixLogo from "../assets/images/urbanmatrix_logo.png";

export type Skill = {
	imageUrl: string;
	name: string;
	type: string;
};

export type Experience = {
	title: string;
	companyName: string;
	icon: string;
	iconBg: string;
	date: string;
	points: string[];
};

export type SocialLink = {
	name: string;
	iconUrl: string;
	link: string;
};

export type Project = {
	iconUrl: string;
	theme: string;
	name: string;
	description: string;
	link: string;
};

export const skills: Skill[] = [
	{ imageUrl: css, name: "CSS", type: "Frontend" },
	{ imageUrl: express, name: "Express", type: "Backend" },
	{ imageUrl: git, name: "Git", type: "Version Control" },
	{ imageUrl: github, name: "GitHub", type: "Version Control" },
	{ imageUrl: html, name: "HTML", type: "Frontend" },
	{ imageUrl: javascript, name: "JavaScript", type: "Frontend" },
	{ imageUrl: mongodb, name: "MongoDB", type: "Database" },
	{ imageUrl: motion, name: "Motion", type: "Animation" },
	{ imageUrl: mui, name: "Material-UI", type: "Frontend" },
	{ imageUrl: nextjs, name: "Next.js", type: "Frontend" },
	{ imageUrl: nodejs, name: "Node.js", type: "Backend" },
	{ imageUrl: react, name: "React", type: "Frontend" },
	{ imageUrl: redux, name: "Redux", type: "State Management" },
	{ imageUrl: sass, name: "Sass", type: "Frontend" },
	{ imageUrl: tailwindcss, name: "Tailwind CSS", type: "Frontend" },
	{ imageUrl: typescript, name: "TypeScript", type: "Frontend" },
];

export const experiences: Experience[] = [
	{
		title: "SDE 1",
		companyName: "UrbanMatrix Technologies",
		icon: urbanmatrixLogo,
		iconBg: "#accbe1",
		date: "September 2023 -June 2024",
		points: [
			"Developed and maintained a web-based product called NextConsole designed for drone flight planning and fleet management, utilizing NextJS 14, Typescript, TailwindCSS, Material UI, Mapbox, Leaflet, React-PDF, Highcharts, and other technologies",
			"Designed and implemented various user roles (e.g., pilot, organization, admin) within the Console platform, ensuring secure access and appropriate permissions for different user types.",
			"Engineered an intuitive mission planner feature within Console, allowing users to plan missions on a map interface and execute them seamlessly.",
			"Integrated real-time drone control functionalities and dynamic mapping capabilities into the Console platform, empowering pilots to take off, land, and navigate drones seamlessly while accessing interactive geographical visualizations through Mapbox and Leaflet libraries.",
			"Developed an internal admin panel for company employees to manage subscriptions, view/edit platform data, and perform administrative tasks efficiently.",
			"Leveraged Highcharts to create interactive and customizable charts and graphs, enabling users to analyze mission data and make informed decisions.",
			"Integrated React-PDF to generate and display mission-related documents and post-flight reports within Console.",
			"Collaborated with cross-functional teams to gather requirements, conduct design reviews, and iterate on features to meet user needs and improve platform usability.",
			"Contributed to code reviews, testing, and debugging processes to ensure the stability, reliability, and scalability of the Console platform.",
			"Stayed updated with emerging technologies and industry best practices to continuously enhance the performance and functionality of the Console application.",
		],
	},
	{
		title: "Product Engineer",
		companyName: "Thinkusable Solutions",
		icon: thinkusableLogo,
		iconBg: "#a2d2ff",
		date: "February 2023 - September 2023",
		points: [
			"Developed a dynamic Ruby on Rails landing page, featuring YouTube video integration, payment processing, and additional pages for teams and ministries.",
			"Designed and implemented a CSS framework called newUI, enhancing the website's overall user interface and ensuring a modern and visually appealing experience.",
			"Collaborated with team members and clients to gather requirements, addressing challenges and ensuring seamless integration of multimedia content.",
			"Integrated a secure payment page, enabling the church to accept online donations and payments through the website.",
			"Demonstrated adaptability by learning and implementing new technologies, adhering to coding standards, and contributing to testing and documentation practices for maintainable code.",
		],
	},
	{
		title: "Software Developer Intern",
		companyName: "UrbanMatrix Technologies",
		icon: urbanmatrixLogo,
		iconBg: "#b7e4c7",
		date: "October 2022 - January 2023",
		points: [
			"Developed and maintained Next.js application.",
			"Utilized React hooks and Redux to maintain state in a clean and organized fashion.",
			"Adapted existing applications to the latest Next.js version making use of React's new Server Components Architecture.",
			"Worked collaboratively to style applications appropriately while also developing custom components to streamline development processes.",
			"Developed integrations with third party APIs such as IronAuth, NextAuth, Mapbox and Sentry .",
			"Built login and signup workflow and UI for our NextJs app using IronAuth.",
			"Developed CI/CD pipelines to quickly deploy applications to production.",
			"Built on-boarding pages for Organizations and User accounts.",
			"Worked on updates and managing user sessions across different browser tabs.",
			"Improved performance through refactoring complex components and optimizing  existing code.",
		],
	},
];

export const socialLinks: SocialLink[] = [
	{
		name: "Contact",
		iconUrl: contact,
		link: "mailto:calebjoshuapaul@gmail.com",
	},
	{
		name: "GitHub",
		iconUrl: github,
		link: "https://github.com/calebjoshuapaul/",
	},
	{
		name: "LinkedIn",
		iconUrl: linkedin,
		link: "https://www.linkedin.com/in/calebjoshuapaul/",
	},
];

export const projects: Project[] = [
	{
		iconUrl: nextconsole,
		theme: "btn-back-yellow",
		name: "NextConsole",
		description:
			"Worked on involved developing a sophisticated drone management cloud-based user interface. This innovative platform allows pilots and organizations to seamlessly plan missions and initiate flights with just the click of a button, all via the cloud. The UI is designed to be intuitive and user-friendly, enabling users to easily coordinate complex flight plans, monitor drone statuses, and ensure compliance with aviation regulations. The project required extensive collaboration with cross-functional teams to integrate real-time data processing, secure cloud storage, and advanced analytics, resulting in a robust system that enhances operational efficiency and mission accuracy for drone operators.",
		link: "https://drive.google.com/file/d/1kZtAnwFNIWGOhPzWqYZ_vZxZiTm9a2EU/view",
	},
	{
		iconUrl: cryptotracker,
		theme: "btn-back-red",
		name: "Crypto Price Tracker",
		description:
			"Developed a cryptocurrency price tracker application using Cloudflare Workers, providing real-time updates with minimal latency. The project involved integrating multiple APIs, designing an intuitive user interface, and ensuring robust security, which enhanced my skills in web development, cloud computing, and real-time data processing.",
		link: "https://github.com/calebjoshuapaul/crypto-price-tracker",
	},
	{
		iconUrl: spaceXlog,
		theme: "btn-back-green",
		name: "Space X Launch Log",
		description:
			"This web app lets the user view the launch log of SpaceX Sattelites, sort upcoming, successfull or failed launches and also to search launches between a set range. Click on a pariticular launch to view more details of the launch.",
		link: "https://github.com/calebjoshuapaul/spacex-project",
	},
	{
		iconUrl: ecommsite,
		theme: "btn-back-black",
		name: "E-comm site",
		description:
			"This web app has all the functionality of a real world E-comm app, To install and view on your local machine fork and clone the project and run: npm install, to install all its dependencies.",
		link: "https://github.com/calebjoshuapaul/demo-ecommerce-site?tab=readme-ov-file#e-comm-site",
	},
];
