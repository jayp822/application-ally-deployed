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
		// Redirect to the sign-in page after logout
		router.push("/");
	};

	if (isLoggedIn) {
		return (
			<div id="navbarDiv">
				<ul className="navbar">
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
						className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 ease-in-out delay-150 duration-300"
						onClick={handleLogout}>
						<button className="" id="signIn">
							Log out
						</button>
					</li>
				</ul>
			</div>
		);
	}
	return (
		<div id="navbarDiv">
			<ul className="navbar">
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

				<li className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 ease-in-out delay-150 duration-300">
					<Link href="sign-in" className=" transition" id="signIn">
						Sign In
					</Link>
				</li>
				<li className="transition px-2 py-2 mx-1 font-semibold text-sm bg-blue-500 text-white rounded-md shadow-sm hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 ease-in-out delay-150 duration-300">
					<Link href="sign-up" className="transition" id="signIn">
						Sign Up
					</Link>
				</li>
			</ul>
		</div>
	);
}
