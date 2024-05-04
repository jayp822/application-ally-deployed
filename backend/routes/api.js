/** @format */

const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/user");
const JobApplication = require("../models/jobApplication");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // For creating and verifying tokens

dotenv.config();

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use("/", router);

const saltRounds = 10;

// ***** START OF USER ROUTES *****

// Get all users
router.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Get specific user
router.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Add a new user
router.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	try {
		// Check if user already exists
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create a new user
		user = new User({
			email: email,
			password: hashedPassword
		});

		// Save the user to the database
		await user.save();

		// Send response with user's ObjectId
		res
			.status(201)
			.json({ msg: "User created successfully", userId: user._id });
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server Error");
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	try {
		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		// Compare the provided password with the hashed password stored in the database
		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		// If passwords match, create a JSON Web Token (JWT)
		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET, // Your JWT secret key
			{ expiresIn: "1h" }, // Token expires in 1 hour
			(err, token) => {
				if (err) throw err;
				res.json({
					token,
					userId: user._id,
					msg: "User signed in successfully"
				});
			}
		);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Server Error" });
	}
});

// Update specific user
router.put("/update-user/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Delete a specific user
router.delete("/delete-user/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// ***** START OF JOB APPLICATION ROUTES *****

// Get all job applications
router.get("/job-applications", async (req, res) => {
	try {
		const applications = await JobApplication.find(); // Corrected typo in variable name
		res.json(applications);
	} catch (error) {
		console.error("Error fetching applications:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Get all job applications for each user
router.get("/job-applications/user/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const applications = await JobApplication.find({ userId }); // Filter applications by userId
		res.json(applications);
	} catch (error) {
		console.error("Error fetching applications:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Get specific job application
router.get("/job-applications/:id", async (req, res) => {
	try {
		const application = await JobApplication.findById(req.params.id);
		if (!application) {
			return res.status(404).json({ error: "Application not found" });
		}
		res.json(application);
	} catch (error) {
		console.error("Error fetching application:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Add a new application
router.post("/add-job-application", async (req, res) => {
	try {
		const application = await JobApplication.create(req.body);
		res.status(201).json(application);
	} catch (error) {
		console.error("Error adding application:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Update specific application
router.put("/update-job-application/:id", async (req, res) => {
	try {
		const updatedApplication = await JobApplication.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedApplication) {
			return res.status(404).json({ error: "Application not found" });
		}
		res.json(updatedApplication);
	} catch (error) {
		console.error("Error updating application:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Delete a specific application
router.delete("/delete-job-application/:id", async (req, res) => {
	try {
		const deletedApplication = await JobApplication.findByIdAndDelete(
			req.params.id
		);
		if (!deletedApplication) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "Application deleted successfully" });
	} catch (error) {
		console.error("Error deleting application:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
