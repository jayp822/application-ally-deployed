import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer()
{
	return (
		<div className="flex flex-col items-center w-full mt-auto p-8 bg-white">
			<Link href="/">
				<Image
					src="/logo.png"
					width={48}
					height={48}
					className="rounded-md w-[3rem] mb-7"
					alt="Company Logo"
				/>
			</Link>
			<p className="font-medium text-lg ">
				Application Ally © {new Date().getFullYear()}
			</p>
			<span className="text-xs pb-5 text-center ">
				Created by: Jay Patel, Thuan Luu, Yang Chen, London Ho <br /> Currently
				worked on by Jay Patel
			</span>
		</div>
	);
}

export default Footer;
