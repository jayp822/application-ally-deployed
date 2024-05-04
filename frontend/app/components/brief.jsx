/** @format */

import React from "react";
import Image from "next/image";

function Brief(props) {
	if (props.position == "right") {
		return (
			<div className="w-[80%] md:w-[70%] lg:w-[60%] flex  justify-center mt-10">
				<div className="content-center text-center mx-[0.5rem] sm:mx-[1rem] md:mx-[2rem] lg:mx-[3rem] xl:mx-[5rem]">
					<span className=" text-white">{props.info}</span>
				</div>
				<Image
					src={props.image}
					width={500}
					height={500}
					alt="information picture"
					className="rounded-lg w-[9rem] sm:w-[12rem] md:w-[18rem]"
				/>
			</div>
		);
	}
	return (
		<div
			className="w-[80%] sm:w-[70%] lg:w-[60%] flex  justify-center mt-10"
			key={props.id}>
			<Image
				src={props.image}
				width={500}
				height={500}
				alt="picture"
				className="rounded-xl w-[9rem] sm:w-[12rem] md:w-[18rem]"
			/>
			<div className="content-center text-center mx-[0.5rem] sm:mx-[1rem] md:mx-[2rem] lg:mx-[4rem] xl:mx-[5rem]">
				<span className=" text-white">{props.info}</span>
			</div>
		</div>
	);
}

export default Brief;
