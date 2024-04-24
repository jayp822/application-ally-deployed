/** @format */

import React from "react";
// import clogo from "@/app/assets/logo.png";
import Image from "next/image";

function Footer() {
	return (
		<div className="flex flex-col items-center w-full mt-auto p-8 bg-white">
			<Image
				src="/logo.png"
				width={48}
				height={48}
				className="rounded-md w-[3rem] mb-7"
				alt="Company Logo"
			/>
			<p className="font-medium text-lg ">
				Application Ally © {new Date().getFullYear()}
			</p>
			<span className="text-xs pb-5 ">
				Created by: Jay Patel, Thuan Luu, Yang Chen, London Ho
			</span>
		</div>
	);
}

export default Footer;
