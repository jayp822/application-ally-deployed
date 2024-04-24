import React from "react";

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
    return (
        <div className="flex justify-center my-5">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onChangePage(i + 1)}
                    className={`mx-2 px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
