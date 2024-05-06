"use client";
import "@/app/globals.css";
import Navbar from "./components/navbar";


import Header from "./components/header";

export default function Home()
{
	return (
		<div className="bg-neutral-900">
			<Navbar />
			<Header />
		</div>
	);
}
