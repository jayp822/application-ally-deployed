/** @format */

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/user";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

const SignUpForm = () => {
	const { signIn } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isButtonDisabled, setButtonDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const LoadingComponent = () => {
		return (
			<div className="text-xl font-semibold text-center">
				<p>Loading...</p>
			</div>
		);
	};
	const handleSubmit = async e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			setButtonDisabled(true);
			setIsLoading(true);

			const response = await axios.post(
				`https://applicationally.azurewebsites.net/api/signup`,
				{
					email,
					password
				}
			);

			// If sign up successful, automatically sign in the user
			if (response.status === 201) {
				await signIn(email, password);
			}
		} catch (error) {
			console.error("Error signing up:", error);

			// Handle error, e.g., display an error message to the user
		} finally {
			setIsLoading(true);

			setButtonDisabled(false);
		}
	};

	return (
		<div className="container max-w-[400px] md:w-[400px] max-h-[400px] md:h-[400px] p-[40px] bg-gray-300 rounded-md mb-10">
			<form onSubmit={handleSubmit}>
				
				<Input
					isRequired
					type="email"
					label="Email"
					id="email"
					name="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					size="lg"
					className="text-lg font-bold text-black mb-2"
				/>
				
				<Input
					isRequired
					type="password"
					id="password"
					name="password"
					label="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					size="lg"
					className="text-lg font-bold text-black mb-2"
				/>
				
				<Input
					isRequired
					type="password"
					id="password"
					name="password"
					label="Confirm Password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					size="lg"
					className="text-lg font-bold text-black mb-2"
				/>
				<button
					className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-800 font-semibold block mx-auto"
					type="submit"
					value="register"
					disabled={isButtonDisabled}>
					Register
				</button>
			</form>
			<div className="text-center mt-3">
				<p className="text-lg font-medium">
					Already a user?{" "}
					<Link
						className="transition text-blue-600 decoration-sky-500 hover:text-blue-900  p-[3px] text-lg font-medium"
						href="/sign-in">
						Login here
					</Link>
				</p>
			</div>
			{isLoading && <CircularProgress label="Loading..." />}
		</div>
	);
};

export default SignUpForm;
