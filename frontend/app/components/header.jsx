/** @format */

import React from "react";
import Home from "./home";
import Image from "next/image";
// import clogo from "@/app/assets/logo.png";
import Link from "next/link";
import { AuthContext } from "../contexts/user";
import { useContext } from "react";

function Header() {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<div>
			<div className="flex flex-col justify-center">
				<div className="">
					<Image
						src="/logo.png"
						width={500}
						height={500}
						alt="Company Logo"
						className="mx-auto mt-14 w-[10rem] sm:w-[15rem] md:w-[18rem] lg:w-[20rem] rounded-lg "
					/>
				</div>
				<h1 className="gradient-text text-transparent text-5xl font-bold animate-gradient mt-[3rem] mb-[3rem] text-center mx-10">
					Stay On Top of Your Job Hunt
				</h1>
			</div>

			<p className="text-white font-medium text-center mx-[2rem] sm:mx-[5rem] md:mx-[10rem] lg:mx-[15rem] xl-[60rem]">
				Searching for a job or internship can be overwhelming, with countless
				applications to keep track of. Introducing Application Ally, a powerful
				Next.js application designed to streamline your job hunt process.
				Application Ally is your ultimate companion, helping you stay organized
				and in control of your applications. With its intuitive interface and
				robust features, you can easily manage all your job applications in one
				centralized location.
			</p>
			<div className="flex justify-center">
				\
				{isLoggedIn ? (
					<Link href="/applications">
						<button className=" mt-6 bg-blue-500 p-3 rounded-lg font-bold hover:bg-blue-950 hover:border-l-blue-100 border-2 animate-gradient text-white">
							DASHBOARD
						</button>
					</Link>
				) : (
					<Link href="/sign-in">
						<button className=" mt-6 bg-blue-500 p-3 rounded-lg font-bold hover:bg-blue-950 hover:border-l-blue-100 border-2 animate-gradient text-white">
							GET STARTED
						</button>
					</Link>
				)}
			</div>

			<Home />
		</div>
	);
}

export default Header;
