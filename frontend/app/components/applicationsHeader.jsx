/** @format */

// ApplicationsHeader.jsx
import React from "react";
import Link from "next/link";

function ApplicationsHeader({ setShowModal }) {
	return (
		<div className="flex flex-wrap sm:flex-col mx-auto items-center my-[2rem]">
			<div className="mx-auto">
				<p className="gradient-text text-transparent text-5xl font-bold animate-gradient m-4">
					Applications
				</p>
			</div>
			<div className="flex mx-auto gap-4">
				<button
					className="hover:bg-blue-800 p-3 bg-blue-500 text-white rounded-md font-semibold"
					onClick={() => setShowModal(true)}>
					Add Job
				</button>
				<button className="hover:bg-blue-800 p-3 bg-blue-500 text-white rounded-md font-semibold">
					<Link href="search-jobs">Explore New Jobs</Link>
				</button>
			</div>
		</div>
	);
}

export default ApplicationsHeader;
