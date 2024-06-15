import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
	const formRef = useRef(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleFocus = () => {};
	const handleBlur = () => {};

	const handleSubmit = (e) => {
		e.preventDefault();
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
				import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
			)
			.then(() => {
				setIsLoading(false);
				setForm({
					name: "",
					email: "",
					message: "",
				});
				//TODO: show success message
				//TODO: Hide alert
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error);
			});
	};

	return (
		<section className="relative flex lg:flex-row flex-col max-container">
			<div className="flex-1 min-w-[50%] flex flex-col">
				<h1 className="head-text">Get in Touch</h1>

				<form
					className="w-full flex flex-col gap-7 mt-14"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<label
						className="text-black-500 font-semibold"
						htmlFor=""
					>
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
					<label
						className="text-black-500 font-semibold"
						htmlFor=""
					>
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
					<label
						className="text-black-500 font-semibold"
						htmlFor=""
					>
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
						onBlur={handleBlur}
						disabled={isLoading}
					>
						{isLoading ? "Sending..." : "Send Message"}
					</button>
				</form>
			</div>
		</section>
	);
}

export default Contact;
