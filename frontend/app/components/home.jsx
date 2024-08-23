import Iframe from "react-iframe";
import React from "react";
import Footer from "./footer";
import Brief from "./brief";
import Goal from "./goal";

function Home()
{
	const DUMMY_BRIEFS = [
		{
			id: 1,
			img: "/stock-AI-1.jpeg",
			postion: "left",
			info: "Customizable Statuses: Never miss a follow-up or interview again. Set personalized statuses to stay on top of your application timeline."
		},
		{
			id: 2,
			img: "/stock-AI-2.jpeg",
			position: "right",
			info: "Comprehensive Dashboard: Get a bird's-eye view of your job hunt progress with a user-friendly dashboard, featuring insightful analytics and visualizations."
		},
		{
			id: 3,
			img: "/stock-AI-3.jpeg",
			position: "left",
			info: "Search New Jobs: With our search jobs feature you can easily find the job title you are looking for in your area. Simply input the job type and location and you will be given a list of current job listings."
		}
	];

	return (
		<div className="flex flex-col items-center w-[100%] min-h-[100vh]">
			<h1 className="text-white mt-20 text-3xl font-semibold">About</h1>
			{DUMMY_BRIEFS.map(brief => (
				<Brief
					key={brief.id}
					info={brief.info}
					image={brief.img}
					position={brief.position}
				/>
			))}
			<h1 className="text-white my-20 text-3xl font-semibold">
				How it Works
			</h1>

			<Iframe
				url="https://www.youtube.com/embed/k046LLcr1wo?si=GrTXFv6kr0DPq2hQ"
				width=""
				id=""
				className="mb-10 mx-[8rem] aspect-video w-[75%]"
				display="block"
				position=""
				allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"
			/>

			<div>
				<h1 className=" my-20 text-white text-3xl font-semibold">Benefits</h1>
			</div>

			<div className="flex flex-wrap justify-center gap-5 w-[100%] mb-[6rem]">
				<Goal
					goalTitle={"Time-Saving Efficiency"}
					goalContent={
						"The app is designed to optimize your time and efforts by automating repetitive tasks and providing seamless integration with job search engines."
					}
				/>
				<Goal
					goalTitle={"Simple Interface"}
					goalContent={
						"With its intuitive and user-friendly interface, the app ensures a seamless experience, allowing you to navigate and manage your job applications with ease."
					}
				/>
				<Goal
					goalTitle={"Robust Features"}
					goalContent={
						"Packed with a comprehensive suite of robust features, the app equips you with all the tools necessary to streamline your job search"
					}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
