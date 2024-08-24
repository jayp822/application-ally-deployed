import React from 'react'

function Statistics({ jobs, filteredJobs, noJobsFound }) {
  return (
    <div className=" rounded-lg text-white bg-slate-600 p-4">
      <h2 className="mb-2 text-xl font-bold text-white">Statistics</h2>
      <p className="text-lg">Total Applications: {jobs.length}</p>
      {filteredJobs.length === 0 && !noJobsFound ? (
        <p className="text-lg">Current Selected: {jobs.length}</p>
      ) : (
        <p className="text-lg">Current Applications: {filteredJobs.length}</p>
      )}
    </div>
  )
}

export default Statistics
