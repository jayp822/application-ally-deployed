/** @format */

"use client";
import "@/app/globals.css";

import Navbar from "../components/navbar";
import SignUpForm from "../components/signUpForm";
import Footer from "../components/footer";
import { AuthContext } from "../contexts/user";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
	const { isLoggedIn } = useContext(AuthContext);
	if (!isLoggedIn) {
		return (
			<div className="flex flex-col min-h-screen bg-neutral-900">
				<Navbar />
				<div className="flex flex-col gap-10 items-center">
					<p className="gradient-text text-transparent text-5xl font-bold animate-gradient mt-[4rem]">
						Sign Up
					</p>
					<SignUpForm />
				</div>

				<Footer />
			</div>
		);
	}
	return (
		<div className="bg-neutral-900 min-h-[100vh] flex flex-col items-center justify-between">
			<Navbar />
			<div className="my-[16rem]">
				<h1 className="text-center text-4xl font-semibold text-white mx-[2rem]">
					You are already signed in
				</h1>
			</div>
			<Footer />
		</div>
	);
}
