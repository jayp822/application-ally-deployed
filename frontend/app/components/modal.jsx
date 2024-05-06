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
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center"
			id="wrapper"
			onClick={handleClose}
		>
			<div className="w-[390px] sm:w-[600px] mt-auto sm:my-auto flex flex-col relative">
				<button
					className="text-white text-xl absolute top-0 right-0 m-4 bg-red-500 size-auto px-2 flex items-center justify-center rounded-lg transition duration-300 hover:bg-red-600"
					onClick={() => props.onClose()}
				>
					X
				</button>
				<div className="bg-white rounded w-full p-5">{props.children}</div>
			</div>
		</div>
	);
}

export default Modal;
