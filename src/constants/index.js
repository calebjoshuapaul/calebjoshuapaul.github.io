import thinkusable_logo from "../assets/images/thinkusable.png";
import urbanmatrix_logo from "../assets/images/urbanmatrix_logo.png";
import {
	car,
	contact,
	css,
	estate,
	express,
	git,
	github,
	html,
	javascript,
	linkedin,
	mongodb,
	motion,
	mui,
	nextjs,
	nodejs,
	pricewise,
	react,
	redux,
	sass,
	snapgram,
	summiz,
	tailwindcss,
	threads,
	typescript,
} from "../assets/icons";

export const skills = [
	{
		imageUrl: css,
		name: "CSS",
		type: "Frontend",
	},
	{
		imageUrl: express,
		name: "Express",
		type: "Backend",
	},
	{
		imageUrl: git,
		name: "Git",
		type: "Version Control",
	},
	{
		imageUrl: github,
		name: "GitHub",
		type: "Version Control",
	},
	{
		imageUrl: html,
		name: "HTML",
		type: "Frontend",
	},
	{
		imageUrl: javascript,
		name: "JavaScript",
		type: "Frontend",
	},
	{
		imageUrl: mongodb,
		name: "MongoDB",
		type: "Database",
	},
	{
		imageUrl: motion,
		name: "Motion",
		type: "Animation",
	},
	{
		imageUrl: mui,
		name: "Material-UI",
		type: "Frontend",
	},
	{
		imageUrl: nextjs,
		name: "Next.js",
		type: "Frontend",
	},
	{
		imageUrl: nodejs,
		name: "Node.js",
		type: "Backend",
	},
	{
		imageUrl: react,
		name: "React",
		type: "Frontend",
	},
	{
		imageUrl: redux,
		name: "Redux",
		type: "State Management",
	},
	{
		imageUrl: sass,
		name: "Sass",
		type: "Frontend",
	},
	{
		imageUrl: tailwindcss,
		name: "Tailwind CSS",
		type: "Frontend",
	},
	{
		imageUrl: typescript,
		name: "TypeScript",
		type: "Frontend",
	},
	// 	imageUrl: rubyonrails,
	// 	name: "Ruby On Rails",
	// 	type: "Frontend",
	// },
	// {
	// 	imageUrl: golang,
	// 	name: "Golang",
	// 	type: "Backend",
	// },
	// 	imageUrl: python,
	// 	name: "Python",
	// 	type: "Backend",
	// },
	// 	imageUrl: postgres,
	// 	name: "Postgres",
	// 	type: "Database",
	// },
];

export const experiences = [
	{
		title: "SDE 1",
		company_name: "UrbanMatrix Technologies",
		icon: urbanmatrix_logo,
		iconBg: "#accbe1",
		date: "September 2023 -June 2024",
		points: [
			`Developed and maintained a web-based product called NextConsole designed for drone flight planning and fleet management, utilizing NextJS 14, Typescript, TailwindCSS, Material UI, Mapbox, Leaflet, React-PDF, Highcharts, and other technologies`,
			`Designed and implemented various user roles (e.g., pilot, organization, admin) within the Console platform, ensuring secure access and appropriate permissions for different user types.`,
			`Engineered an intuitive mission planner feature within Console, allowing users to plan missions on a map interface and execute them seamlessly.`,
			`Integrated real-time drone control functionalities and dynamic mapping capabilities into the Console platform, empowering pilots to take off, land, and navigate drones seamlessly while accessing interactive geographical visualizations through Mapbox and Leaflet libraries.`,
			`Developed an internal admin panel for company employees to manage subscriptions, view/edit platform data, and perform administrative tasks efficiently.`,
			`Leveraged Highcharts to create interactive and customizable charts and graphs, enabling users to analyze mission data and make informed decisions.`,
			`Integrated React-PDF to generate and display mission-related documents and post-flight reports within Console.`,
			`Collaborated with cross-functional teams to gather requirements, conduct design reviews, and iterate on features to meet user needs and improve platform usability.`,
			`Contributed to code reviews, testing, and debugging processes to ensure the stability, reliability, and scalability of the Console platform.`,
			`Stayed updated with emerging technologies and industry best practices to continuously enhance the performance and functionality of the Console application.`,
		],
	},
	{
		title: "Product Engineer",
		company_name: "Thinkusable Solutions",
		icon: thinkusable_logo,
		iconBg: "#a2d2ff",
		date: "February 2023 - September 2023",
		points: [
			`Developed a dynamic Ruby on Rails landing page, featuring YouTube video integration, payment processing, and additional pages for teams and ministries.`,
			`Designed and implemented a CSS framework called newUI, enhancing the website's overall user interface and ensuring a modern and visually appealing experience.`,
			`Collaborated with team members and clients to gather requirements, addressing challenges and ensuring seamless integration of multimedia content.`,
			`Integrated a secure payment page, enabling the church to accept online donations and payments through the website.`,
			`Demonstrated adaptability by learning and implementing new technologies, adhering to coding standards, and contributing to testing and documentation practices for maintainable code.`,
		],
	},
	{
		title: "Software Developer Intern",
		company_name: "UrbanMatrix Technologies",
		icon: urbanmatrix_logo,
		iconBg: "#b7e4c7",
		date: "October 2022 - January 2023",
		points: [
			`Developed and maintained Next.js application.`,
			`Utilized React hooks and Redux to maintain state in a clean and organized fashion.`,
			`Adapted existing applications to the latest Next.js version making use of React's new Server Components Architecture.`,
			`Worked collaboratively to style applications appropriately while also developing custom components to streamline development processes.`,
			`Developed integrations with third party APIs such as IronAuth, NextAuth, Mapbox and Sentry .`,
			`Built login and signup workflow and UI for our NextJs app using IronAuth.`,
			`Developed CI/CD pipelines to quickly deploy applications to production.`,
			`Built on-boarding pages for Organizations and User accounts.`,
			`Worked on updates and managing user sessions across different browser tabs.`,
			`Improved performance through refactoring complex components and optimizing  existing code.`,
		],
	},
];

export const socialLinks = [
	{
		name: "Contact",
		iconUrl: contact,
		link: "/contact",
	},
	{
		name: "GitHub",
		iconUrl: github,
		link: "https://github.com/YourGitHubUsername",
	},
	{
		name: "LinkedIn",
		iconUrl: linkedin,
		link: "https://www.linkedin.com/in/YourLinkedInUsername",
	},
];

export const projects = [
	{
		iconUrl: pricewise,
		theme: "btn-back-red",
		name: "Amazon Price Tracker",
		description:
			"Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.",
		link: "https://github.com/adrianhajdin/pricewise",
	},
	{
		iconUrl: threads,
		theme: "btn-back-green",
		name: "Full Stack Threads Clone",
		description:
			'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
		link: "https://github.com/adrianhajdin/threads",
	},
	{
		iconUrl: car,
		theme: "btn-back-blue",
		name: "Car Finding App",
		description:
			"Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.",
		link: "https://github.com/adrianhajdin/project_next13_car_showcase",
	},
	{
		iconUrl: snapgram,
		theme: "btn-back-pink",
		name: "Full Stack Instagram Clone",
		description:
			"Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.",
		link: "https://github.com/adrianhajdin/social_media_app",
	},
	{
		iconUrl: estate,
		theme: "btn-back-black",
		name: "Real-Estate Application",
		description:
			"Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.",
		link: "https://github.com/adrianhajdin/projects_realestate",
	},
	{
		iconUrl: summiz,
		theme: "btn-back-yellow",
		name: "AI Summarizer Application",
		description:
			"App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.",
		link: "https://github.com/adrianhajdin/project_ai_summarizer",
	},
];
