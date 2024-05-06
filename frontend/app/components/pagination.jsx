import React from "react";

const Pagination = ({
	currentPage,
	totalPages,
	onChangePage,
	pagesPerRow = 10
}) =>
{
	const totalRows = Math.ceil(totalPages / pagesPerRow);

	const renderPagination = () =>
	{
		const pages = [];
		for (let i = 1; i <= totalRows; i++)
		{
			const startPage = (i - 1) * pagesPerRow + 1;
			const endPage = Math.min(i * pagesPerRow, totalPages);
			const pageButtons = [];

			for (let j = startPage; j <= endPage; j++)
			{
				pageButtons.push(
					<button
						key={j}
						onClick={() => onChangePage(j)}
						className={`mx-2 px-4 py-2 rounded-md ${currentPage === j
							? "bg-blue-500 text-white hover:bg-blue-600"
							: "bg-gray-300 text-gray-800 hover:bg-gray-400"
							}`}>
						{j}
					</button>
				);
			}
			pages.push(
				<div key={i} className="flex justify-center my-5">
					{pageButtons}
				</div>
			);
		}
		return pages;
	};

	return <div>{renderPagination()}</div>;
};

export default Pagination;
