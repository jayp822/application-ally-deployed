/** @format */

import React, { children } from "react";

function Modal(props) {
	if (!props.isVisible) {
		return null;
	}
	
	const handleClose = (event) => {
		if (event.target.id === "wrapper") props.onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
			id="wrapper"
			onClick={handleClose}
		>
			<div className="w-[390px] sm:w-[600px] flex flex-col relative">
				<button
					className="text-white text-2xl absolute top-0 right-0 m-4 bg-red-500 w-10 h-10 flex items-center justify-center rounded-lg transition duration-300 hover:bg-red-600"
					onClick={() => props.onClose()}
				>
					X
				</button>
				<div className="bg-white p-2 rounded w-full px-7 pt-8 pb-4">{props.children}</div>
			</div>
		</div>
	);
}

export default Modal;
