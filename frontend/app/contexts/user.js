/** @format */

/** @format */

"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	// const [userID, setUserID] = useState(null);
	const router = useRouter();

	// Function to handle sign in
	const signIn = async (email, password) => {
		try {
			const response = await axios.post("http://localhost:8000/api/signin", {
				email,
				password
			});
			const authToken = response.data.token;
			localStorage.setItem("token", authToken); // Store the token in localStorage
			setToken(authToken);
			setIsLoggedIn(true);
			// console.log(response.data.userId)
			// setUserID(response.data.userId);
			localStorage.setItem("userID", response.data.userId);
			router.push("/applications"); // Redirect after successful sign-in
		} catch (error) {
			alert("Wrong Email or Password");
			console.error("Error signing in:", error);
			// Handle error, e.g., display an error message to the user
		}
	};

	// Function to handle sign out
	const signOut = () => {
		localStorage.removeItem("token"); // Remove the token from localStorage
		localStorage.removeItem("userID");
		setToken(null);
		setIsLoggedIn(false);
		router.push("/"); // Redirect after successful sign-out
	};

	useEffect(() => {
		// Check if token exists in localStorage on component mount
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
