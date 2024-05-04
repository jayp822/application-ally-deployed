/** @format */
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../contexts/user";
import { useContext } from "react";
import { useRouter } from "next/navigation"; // Correct import

export default function Navbar() {
	const { isLoggedIn, signOut } = useContext(AuthContext); // Update to use useContext
	const router = useRouter();

	const handleLogout = () => {
		// Perform logout actions
		signOut(); // Call signOut function from context
		router.push("/");
	};

	if (isLoggedIn) {
		return (
			<div className=" m-0 w-full p-[8px]">
				<ul className="mt-[10px] h-full px-[5%] flex flex-wrap justify-end items-center font-medium list-none">
					<li className="mr-auto">
						<Link href="/">
							<Image
								src="/logo.png"
								width={500}
								height={500}
								className="rounded-md w-[4rem]"
								alt="Company Logo"
							/>
						</Link>
					</li>
					<li>
						<Link
							href="/"
							className="transition text-white hover:underline decoration-sky-500 hover:text-blue-500  p-[5px]  ">
							Home
						</Link>
					</li>
					<li>
						<Link
							href="applications"
							className="transition text-white hover:underline decoration-sky-500 hover:text-blue-500  p-[5px]  ">
							Applications
						</Link>
					</li>
					<li>
						<Link
							href="search-jobs"
							className="transition text-white hover:underline decoration-sky-500 hover:text-blue-500  p-[5px]">
							Search Jobs
						</Link>
					</li>

					<li
						className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:scale-100 hover:bg-indigo-500 ease-in-out delay-150 duration-300"
						onClick={handleLogout}>
						<button id="signIn">
							Log out
						</button>
					</li>
				</ul>
			</div>
		);
	}
	return (
		<div className=" m-0 w-full p-[8px]">
			<ul className="mt-[10px] h-full px-[5%] flex flex-wrap justify-end items-center font-medium list-none">
				<li className="mr-auto">
					<Link href="/">
						<Image
							src="/logo.png"
							width={500}
							height={500}
							className="rounded-md w-[4rem]"
							alt="Company Logo"
						/>
					</Link>
				</li>
				<li>
					<Link
						href="/"
						className="transition text-white hover:underline decoration-sky-500 hover:text-blue-500  p-[5px]  ">
						Home
					</Link>
				</li>

				<li>
					<Link href="sign-in" className=" transition" id="signIn">
						<button className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:scale-[110%]  hover:bg-indigo-500 ease-in-out delay-150 duration-300">
							Sign In
						</button>
					</Link>
				</li>
				<li>
					<Link href="sign-up" className="transition" id="signIn">
						<button className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:scale-[110%]  hover:bg-indigo-500 ease-in-out delay-150 duration-300">
							Sign Up
						</button>
					</Link>
				</li>
			</ul>
		</div>
	);
}
