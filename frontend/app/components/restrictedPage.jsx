import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

function RestrictedPage(props)
{
	return (
		<div className="bg-neutral-900 min-h-screen flex flex-col items-center ">
			<Navbar />
			<div className="my-auto">
				<h1 className="text-center text-4xl font-semibold text-white">
					{props.heading}
				</h1>
			</div>
			<Footer />
		</div>
	);
}

export default RestrictedPage;
