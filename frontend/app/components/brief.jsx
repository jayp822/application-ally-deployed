/** @format */

import React from "react";
import Image from "next/image";

function Brief(props) {
	if (props.position == "right") {
		return (
			<div className="flex items-center w-[90%] md:w-[70%] lg:w-[55%] flex justify-center mt-10">
				<div className="text-center mx-[0.5rem] sm:mx-[1rem] md:mx-[2rem] lg:mx-[3rem] xl:mx-[5rem]">
					<span className=" text-white">{props.info}</span>
				</div>
				<Image
					src={props.image}
					width={500}
					height={500}
					alt="information picture"
					className="rounded-lg items-center size-1/3"
				/>
			</div>
		);
	}
	return (
		<div
			className="flex items-center w-[90%] md:w-[70%] lg:w-[55%] justify-center mt-10"
			key={props.id}>
			<Image
				src={props.image}
				width={500}
				height={500}
				alt="picture"
				className="rounded-lg items-center size-1/3"
			/>
			<div className="text-center mx-[0.5rem] sm:mx-[1rem] md:mx-[2rem] lg:mx-[3rem] xl:mx-[5rem]">
				<span className=" text-white">{props.info}</span>
			</div>
		</div>
	);
}

export default Brief;
