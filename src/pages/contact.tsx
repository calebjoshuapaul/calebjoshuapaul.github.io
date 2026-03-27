import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import {
	type ChangeEvent,
	type FormEvent,
	Suspense,
	useRef,
	useState,
} from "react";

import Loader from "../components/loader";
import { useToast } from "../components/ui/use-toast";
import Fox from "../models/Fox";

type ContactForm = {
	name: string;
	email: string;
	message: string;
};

export default function Contact() {
	const formRef = useRef<HTMLFormElement>(null);
	const [form, setForm] = useState<ContactForm>({
		name: "",
		email: "",
		message: "",
	});
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [currentAnimation, setCurrentAnimation] = useState("idle");

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleFocus = () => setCurrentAnimation("walk");
	const handleBlur = () => setCurrentAnimation("idle");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentAnimation("hit");
		setIsLoading(true);

		emailjs
			.send(
				import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: "Caleb",
					from_email: form.email,
					to_email: import.meta.env.VITE_APP_MY_EMAIL,
					message: form.message,
				},
				import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
			)
			.then(() => {
				setIsLoading(false);
				setTimeout(() => {
					setCurrentAnimation("idle");
					setForm({ name: "", email: "", message: "" });
				}, 3000);
				toast({
					title: "Message sent successfully",
					description:
						"Thank you for reaching out. I will get back to you as soon as possible.",
				});
			})
			.catch((error: unknown) => {
				setIsLoading(false);
				setCurrentAnimation("idle");
				console.error(error);
				toast({
					title: "Unable to send message",
					description: "Please try again after sometime",
					variant: "destructive",
				});
			});
	};

	return (
		<section className="relative flex max-container flex-col lg:flex-row">
			<div className="flex min-w-[50%] flex-1 flex-col">
				<h1 className="head-text">Get in Touch</h1>

				<form
					className="mt-14 flex w-full flex-col gap-7"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<label className="font-semibold text-black-500">
						Name
						<input
							type="text"
							name="name"
							className="input"
							placeholder="Enter your name"
							required
							value={form.name}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<label className="font-semibold text-black-500">
						Email
						<input
							type="email"
							name="email"
							className="input"
							placeholder="Enter your email"
							required
							value={form.email}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<label className="font-semibold text-black-500">
						Message
						<textarea
							name="message"
							rows={4}
							className="textarea"
							placeholder="Let me know how I can help you"
							required
							value={form.message}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<button
						type="submit"
						className="btn"
						onFocus={handleFocus}
						disabled={isLoading}
					>
						{isLoading ? "Sending..." : "Send Message"}
					</button>
				</form>
			</div>
			<div className="h-[350px] w-full md:h-[550px] lg:h-auto lg:w-1/2">
				<Canvas
					camera={{
						position: [0, 0, 5],
						fov: 75,
						near: 0.1,
						far: 1000,
					}}
				>
					<directionalLight intensity={2.5} position={[0, 0, 1]} />
					<ambientLight intensity={0.5} />
					<Suspense fallback={<Loader />}>
						<Fox
							position={[0.5, 0.35, 0]}
							rotation={[12.6, -0.6, 0]}
							scale={[0.5, 0.5, 0.5]}
							currentAnimation={currentAnimation}
						/>
					</Suspense>
				</Canvas>
			</div>
		</section>
	);
}
