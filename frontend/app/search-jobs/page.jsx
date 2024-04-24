/** @format */

"use client";
import "@/app/globals.css";
import Navbar from "@/app/components/navbar";
import { useState } from "react";
import Footer from "@/app/components/footer";
import { useContext } from "react";
import { AuthContext } from "../contexts/user";
import Pagination from "../components/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Page() {
	const [currentPage, setCurrentPage] = useState(1);
	const [jobsPerPage] = useState(4);
	const [isButtonDisabled, setButtonDisabled] = useState(false);
	const { isLoggedIn } = useContext(AuthContext);
	const [jobs, setJobs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams, setSearchParams] = useState({ name: "", location: "" });
	const userId =
		typeof window !== "undefined" ? localStorage.getItem("userID") : null;

	const fetchJobs = async () => {
		const { name, location } = searchParams;
		const url = `https://job-salary-data.p.rapidapi.com/job-salary?job_title=${name}&location=${location}&radius=200`;

		try {
			setIsLoading(true);
			setButtonDisabled(true);
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"180ab761fbmsh01d2f09891ad816p1bcf53jsna79ced5b1c7f",
						// "3391535bd1msh8918fae9f7b88a3p1e3a7djsn4a1c7efe158c",
					"X-RapidAPI-Host": "job-salary-data.p.rapidapi.com"
				}
			});

			if (!response.ok) {
				throw new Error(
					`Failed to fetch data: ${response.status} ${response.statusText}`
				);
			}
			const data = await response.json();

			console.log("Fetched data:", data);
			setJobs(data.data);
			setCurrentPage(1);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
			setButtonDisabled(false);
		}
	};

	const LoadingComponent = () => {
		return (
			<div className="text-xl text-white font-semibold text-center">
				<p>Loading...</p>
			</div>
		);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSearchParams({ ...searchParams, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		fetchJobs();
	};

	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
	const changePageHandler = pageNumber => {
		setCurrentPage(pageNumber);
	};
	// const notify = () => toast("Added Job to Applications!");
	const addJobHandler = job => {
		axios
			.post("https://application-ally.onrender.com/api/add-job-application", job)
			.then(res => {
				toast.success("Added job successfully! 😃");
				console.log(res.data);
			})
			.catch(error => {
				toast.error("Failed to add job!");
				console.error("Error adding job application: 😞", error);
			});
	};

	if (isLoggedIn) {
		return (
			<div className="min-h-[100vh] bg-neutral-900 flex flex-col">
				<Navbar />
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable={false}
					pauseOnHover={false}
					theme="colored"
				/>

				<p className="gradient-text text-center text-transparent text-5xl font-bold animate-gradient mt-[4rem]">
					Explore New Jobs
				</p>
				<div className="mt-[3rem]">
					<form
						className="flex flex-col items-center gap-4 justify-stretch"
						onSubmit={handleSubmit}>
						<div>
							<h1 className="text-white text-center font-semibold text-2xl mr-3">
								Title:
							</h1>
							<input
								className="rounded-lg px-4 py-2 mt-3 font-semibold"
								type="text"
								id="name"
								placeholder="Software Developer"
								name="name"
								value={searchParams.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mt-2">
							<h1 className="text-white text-center font-semibold text-2xl mr-3">
								Location:
							</h1>

							<input
								className="rounded-lg px-4 py-2 my-3 font-semibold"
								type="text"
								placeholder="Athens, GA"
								id="location"
								name="location"
								value={searchParams.location}
								onChange={handleInputChange}
							/>

							<button
								className="block bg-blue-500 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-md max-w-[5rem] mx-auto"
								disabled={isButtonDisabled}>
								Find
							</button>
						</div>
					</form>
				</div>

				{currentJobs.length > 0 ? (
					<div className="flex w-auto mx-auto flex-col gap-4 rounded-md p-4 bg-slate-600 my-5">
						{currentJobs.map((job, index) => (
							<div
								key={index}
								className="flex flex-col p-4 mx-auto w-full rounded-lg mb-4 text-white bg-neutral-800 ">
								<div className="flex flex-col flex-wrap">
									<div className="flex justify-between items-center">
										<h3 className="font-bold text-blue-500 text-2xl px-2 py-1">
											{job.job_title}
										</h3>
										<button
											className="p-2 rounded-lg ml-auto bg-slate-500 hover:bg-green-500 mt-5 text-white font-semibold"
											onClick={() =>
												addJobHandler({
													userId: userId,
													title: job.job_title,
													company: job.publisher_name,
													location: job.location,
													salary: `${job.min_salary.toLocaleString("en-US", {
														style: "currency",
														currency: "USD"
													})} - ${job.max_salary.toLocaleString("en-US", {
														style: "currency",
														currency: "USD"
													})}`,
													website: job.publisher_link,
													status: "Not Applied"
												})
											}>
											Add Job
										</button>
									</div>
									<p className="text-white px-2 py-1 text-xl font-semibold">
										{job.publisher_name}
									</p>
									<p className="text-white px-2 py-1 text-lg">{job.location}</p>
									<p className="text-white px-2 py-1 text-lg pb-6">
										{job.min_salary.toLocaleString("en-US", {
											style: "currency",
											currency: "USD"
										})}
										-
										{job.max_salary.toLocaleString("en-US", {
											style: "currency",
											currency: "USD"
										})}
									</p>
									<a
										className="underline hover:text-blue-500 text-white text-sm"
										href={job.publisher_link}
										target="_blank"
										rel="">
										{job.publisher_link}
									</a>
								</div>
							</div>
						))}
					</div>
				) : (
					<div>
						{isLoading && <LoadingComponent />}
						<p className="text-center text-white mt-8 text-xl mb-4">
							No results found
						</p>
					</div>
				)}
				<div className="mb-4">
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(currentJobs.length / jobsPerPage)}
						onChangePage={changePageHandler}
					/>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="bg-neutral-900 min-h-[100vh] flex flex-col items-center justify-between">
			<Navbar />
			<div className="my-[16rem]">
				<h1 className="text-center text-4xl font-semibold text-white mx-[2rem]">
					You Must be logged in to view this page
				</h1>
			</div>
			<Footer />
		</div>
	);
}
