/** @format */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarContent,
	NavbarItem,
	Button
} from "@nextui-org/react";
import Image from "next/image";
import { AuthContext } from "../contexts/user";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
	const { isLoggedIn, signOut } = useContext(AuthContext);
	const router = useRouter();

	const handleLogout = () => {
		signOut();
		router.push("/");
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const menuItems = [
		{ title: "Home", color: "white", ref: "/" },
		{ title: "Applications", color: "white", ref: "/applications" },
		{ title: "Search Jobs", color: "white", ref: "/search-jobs" },
		{ title: "Logout", color: "red", ref: "/", handler: handleLogout }
	];

	// const [activeItem, setActiveItem] = useState("Applications");
	// useEffect(() => {
	// 	if(pathname == "applications"){
	// 		setActiveItem("Applications")
	// 	} else if(pathname == "search-jobs"){
	// 					setActiveItem("Search Jobs")
	// 	}else{
	// 				setActiveItem("Home");
	// 	}
	// }, [pathname]);

	// const handleItemClick = title => {
	// 		if(title == "applications"){
	// 		setActiveItem("Applications")
	// 	} else if(pathname == "search-jobs"){
	// 					setActiveItem("Search Jobs")
	// 	}else{
	// 				setActiveItem("Home");
	// 	}
	// };

	if (isLoggedIn) {
		return (
			<Navbar
				
				shouldHideOnScroll
				maxWidth="full"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				className="text-white bg-neutral-900 mx-0 p-2 pt-8">
				<NavbarContent className="sm:hidden" justify="start">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					/>
				</NavbarContent>

				<NavbarContent className="sm:hidden" justify="center">
					<Link href="/">
						<NavbarBrand>
							<p className="font-bold text-lg text-white">Application Ally</p>
						</NavbarBrand>
					</Link>
				</NavbarContent>
				<NavbarContent className="sm:hidden" justify="end"></NavbarContent>

				<NavbarContent className="hidden sm:flex gap-4" justify="start">
					<NavbarBrand>
						<Link href="/">
							<Image
								src="/logo.png"
								width={70}
								height={70}
								className="rounded-lg"
							/>
						</Link>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
						<Link
							className="transition px-2 py-2 mx-1 hover:text-blue-500 font-semibold text-white"
							href="/"
							// onClick={() => handleItemClick("Home")}
						>
							Home
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link
							className="transition px-2 py-2 mx-1 hover:text-blue-500 font-semibold text-white"
							href="/applications"
							// onClick={() => handleItemClick("Applications")}
						>
							Applications
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link
							className="transition px-2 py-2 mx-1 hover:text-blue-500 font-semibold text-white"
							href="/search-jobs"
							// onClick={() => handleItemClick("Search Jobs")}
						>
							Search Jobs
						</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent justify="end" className=" hidden sm:flex">
					<Button
						as={Link}
						color="danger"
						href="/sign-up"
						variant="flat"
						onClick={handleLogout}>
						Log Out
					</Button>
				</NavbarContent>

				<NavbarMenu className="bg-current mt-10">
					{menuItems.map((item, index) => (
						<Link
								
								href={item.ref}
								size="lg"
								onClick={item.handler}>
						<NavbarMenuItem key={index} className={`w-full hover:bg-blue-500 ${
									item.title === "Logout"
										? "text-red-500 hover:bg-white hover:text-black"
										: "text-white"
								} mx-auto rounded p-3 font-semibold text-lg`}>
							
								{item.title}
							
						</NavbarMenuItem>
						</Link>
					))}
				</NavbarMenu>
			</Navbar>
		);
	}
	return (
		<Navbar
			shouldHideOnScroll
			maxWidth="full"
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			className="text-white bg-neutral-900 mx-0 p-2 pt-8">
			<NavbarContent justify="start">
				<NavbarBrand>
					<Link href="/">
						<Image
							src="/logo.png"
							width={70}
							height={70}
							className="rounded-lg"
						/>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="center"></NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Link
						href="/"
						className="font-semibold text-white hover:text-blue-500 transition ease-in-out duration-200">
						Home
					</Link>
				</NavbarItem>
				<Button as={Link} color="primary" href="/sign-in" variant="solid">
					Sign In
				</Button>
				<NavbarItem>
					<Button as={Link} color="warning" href="/sign-up" variant="solid">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
