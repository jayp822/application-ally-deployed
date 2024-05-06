/** @format */

// StatusFilter.jsx
import React from "react";

function StatusFilter({ selectedStatus, toggleStatus }) {
	return (
		<div className="rounded-md p-4 mb-4 bg-slate-600">
			<h2 className="text-xl font-bold text-white my-2 px-2">Status</h2>
			<div className="text-white">
				<button
					className={`p-2 m-2 rounded-md font-semibold ${
						selectedStatus === "Applied"
							? "bg-green-700 "
							: "bg-green-500 hover:bg-green-700"
					}`}
					onClick={() => toggleStatus("Applied")}>
					Applied
				</button>
				<button
					className={`p-2 m-2 rounded-md font-semibold ${
						selectedStatus === "Interview"
							? "bg-yellow-700"
							: "bg-yellow-500 hover:bg-yellow-700"
					}`}
					onClick={() => toggleStatus("Interview")}>
					Interview
				</button>
				<button
					className={`p-2 m-2 rounded-md font-semibold ${
						selectedStatus === "Rejected"
							? "bg-red-700"
							: "bg-red-500 hover:bg-red-700"
					}`}
					onClick={() => toggleStatus("Rejected")}>
					Rejected
				</button>
				<button
					className={`p-2 m-2 rounded-md font-semibold ${
						selectedStatus === "Not Applied"
							? "bg-neutral-700"
							: "bg-neutral-500 hover:bg-neutral-700"
					}`}
					onClick={() => toggleStatus("Not Applied")}>
					Not Applied
				</button>
				<button
					className={`p-2 m-2 rounded-md font-semibold ${
						selectedStatus === "Offered"
							? "bg-sky-700"
							: "bg-sky-500 hover:bg-sky-700"
					}`}
					onClick={() => toggleStatus("Offered")}>
					Offered
				</button>
			</div>
		</div>
	);
}

export default StatusFilter;
