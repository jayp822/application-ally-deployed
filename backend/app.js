const dotenv = require("dotenv");
const express = require("express");
const api = require("./routes/api");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_STR = process.env.MONGO_STR;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use("/api", api);

mongoose.set("strictQuery", false);
mongoose
	.connect(MONGO_STR)
	.then(() =>
	{
		console.log("MongoDB successfully connected...");
		app.listen(PORT, () =>
		{
			console.log(`Server running on port http://localhost:${PORT}`);
		});
	})
	.catch(err =>
	{
		console.log(`Error in DB connection ${err}`);
	});

app.get("/", (req, res) =>
{
	res.send("Express test route succeded");
});
