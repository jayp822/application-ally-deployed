/** @format */

// SearchBar.jsx
import React from "react";

function SearchBar({
	searchQuery,
	searchQueryHandler,
	onClickSearchQueryHandler,
	resetSearchQueryHandler
}) {
	return (
		<div className="flex flex-col gap-4 rounded-md bg-slate-600 p-4">
			<h2 className="text-xl font-bold text-white">Search Bar</h2>
			<div className="">
				<input
					id="searchBar"
					className="rounded-md p-2"
					type="text"
					placeholder="Enter here"
					value={searchQuery}
					onChange={searchQueryHandler}
				/>
			</div>
			<div>
				<button
					className="p-2 mr-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md max-w-[5rem] font-semibold"
					onClick={onClickSearchQueryHandler}>
					Find
				</button>
				<button
					className="p-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md max-w-[5rem] font-semibold"
					onClick={resetSearchQueryHandler}>
					Reset
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
