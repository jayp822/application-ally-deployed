/** @format */

"use client";
import "@/app/globals.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Modal from "../components/modal";
import JobsCardList from "../components/jobsCardList";
import AddJobs from "../components/addJobs";
import Footer from "@/app/components/footer";
import { AuthContext } from "../contexts/user";
import EditJobs from "../components/editJobs";
import Pagination from "../components/pagination";
import { ToastContainer } from "react-toastify";
import RestrictedPage from "../components/restrictedPage";
import "react-toastify/dist/ReactToastify.css";
import Statistics from "../components/statistics";
import ApplicationsHeader from "../components/applicationsHeader";
import SearchBar from "../components/searchBar";
import StatusFilter from "../components/statusFilter";

export default function Applications() {
	const { isLoggedIn } = useContext(AuthContext);
	const userId =
		typeof window !== "undefined" ? localStorage.getItem("userID") : null;

	const [jobs, setJobs] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editJobs, setEditJobs] = useState(false);
	const [editJobsData, setEditJobsData] = useState("");

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [noJobsFound, setNoJobsFound] = useState(false);

	const [selectedStatus, setSelectedStatus] = useState(null);

	// Job Display
	const [currentPage, setCurrentPage] = useState(1);
	const jobsPerPage = 4;
	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs =
		filteredJobs.length > 0
			? filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
			: jobs.slice(indexOfFirstJob, indexOfLastJob);

	const totalPages = Math.ceil(
		filteredJobs.length > 0
			? filteredJobs.length / jobsPerPage
			: jobs.length / jobsPerPage
	);

	useEffect(() => {
		console.log(userId);
		axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND}/api/job-applications/user/${userId}`
			)
			.then(res => {
				console.log(res.data);
				const reversedJobs = res.data.reverse();
				setJobs(reversedJobs);
			})
			.catch(err => {
				console.error("Error fetching job applications data:", err);
			});
	}, []);

	useEffect(() => {
		if (selectedStatus) {
			const filtered = jobs.filter(job => job.status === selectedStatus);
			setFilteredJobs(filtered);
			setCurrentPage(1);
			setNoJobsFound(filtered.length === 0);
		} else {
			setFilteredJobs([]);
			setNoJobsFound(false);
		}
	}, [selectedStatus, jobs]);

	const toggleStatus = status => {
		setSelectedStatus(prevStatus => (prevStatus === status ? null : status));
	};

	const changePageHandler = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const addJobsHandler = job => {
		setJobs(prevJobs => {
			return [job, ...prevJobs];
		});

		setCurrentPage(1);
		setShowModal(false);
		resetSearchQueryHandler();

		console.log(job);
	};

	const isEditJobs = job => {
		setEditJobs(true);
		setEditJobsData(job);
		console.log(job);
		setShowModal(true);
	};

	const editJobsHandler = editedJob => {
		setJobs(prevJobs => {
			return prevJobs.map(job => {
				if (job._id === editedJob.id) {
					job.title = editedJob.title;
					job.company = editedJob.company;
					job.location = editedJob.location;
					job.salary = editedJob.salary;
					job.website = editedJob.website;
					job.status = editedJob.status;
				}
				return job;
			});
		});

		resetModalState();
		console.log(editedJob);
	};

	const deleteJobsHandler = id => {
		setJobs(prevJobs => {
			return prevJobs.filter(job => job._id !== id);
		});
	};

	const updateJobStatus = (id, newStatus) => {
		setJobs(prevJobs => {
			return prevJobs.map(job => {
				if (job._id === id) {
					return { ...job, status: newStatus };
				} else {
					return job;
				}
			});
		});

		setFilteredJobs(prevJobs => {
			return prevJobs.map(job => {
				if (job._id === id) {
					return { ...job, status: newStatus };
				} else {
					return job;
				}
			});
		});
	};

	const resetModalState = () => {
		setEditJobs(false);
		setEditJobsData(null);
		setShowModal(false);
	};

	const searchQueryHandler = event => {
		setSearchQuery(event.target.value);
	};

	const onClickSearchQueryHandler = () => {
		if (searchQuery.trim() === "") {
			setFilteredJobs([]);
		} else {
			const filtered = jobs.filter(job => {
				return job.title.toLowerCase().includes(searchQuery.toLowerCase());
			});
			if (filtered.length === 0) {
				setFilteredJobs([]);
				setNoJobsFound(true);
			} else {
				setFilteredJobs(filtered);
				setNoJobsFound(false);
			}
		}

		setCurrentPage(1);
	};

	const resetSearchQueryHandler = () => {
		setSearchQuery("");
		setFilteredJobs([]);
		setNoJobsFound(false);
		setSelectedStatus(null);
		setCurrentPage(1);
	};

	if (isLoggedIn) {
		return (
			<div className="bg-neutral-900 flex flex-col min-h-[100vh]">
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

				<ApplicationsHeader setShowModal={setShowModal} />
				<div className="flex flex-col sm:flex-row">
					<div className="basis-1/4 flex flex-col gap-4 p-4 mx-[2rem]">
						<Statistics
							jobs={jobs}
							filteredJobs={filteredJobs}
							noJobsFound={noJobsFound}
						/>
						<SearchBar
							searchQuery={searchQuery}
							searchQueryHandler={searchQueryHandler}
							onClickSearchQueryHandler={onClickSearchQueryHandler}
							resetSearchQueryHandler={resetSearchQueryHandler}
						/>
						<StatusFilter
							selectedStatus={selectedStatus}
							toggleStatus={toggleStatus}
						/>
					</div>

					<div className="basis-3/4 border-gray-400 p-4 mx-[2rem]">
						{noJobsFound ? (
							<p className="rounded-lg p-6 bg-slate-600 mx-5 text-center text-white text-xl">
								No jobs found
							</p>
						) : (
							<div>
								<JobsCardList
									items={currentJobs}
									onDeleteJobs={deleteJobsHandler}
									onIsEditJobs={isEditJobs}
									onStatusChange={updateJobStatus}
								/>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onChangePage={changePageHandler}
								/>
							</div>
						)}
					</div>
				</div>

				<Modal isVisible={showModal} onClose={resetModalState}>
					{editJobs ? (
						<EditJobs
							job={editJobsData}
							onEditJobs={editJobsHandler}
							onClose={() => setShowModal(false)}
						/>
					) : (
						<AddJobs
							onAddJobs={addJobsHandler}
							onClose={() => setShowModal(false)}
						/>
					)}
				</Modal>
				<Footer />
			</div>
		);
	}
	return (
		<RestrictedPage heading="You need to be signed in to access this page" />
	);
}
