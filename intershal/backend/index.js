import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utility/connectDb.js";
import cors from "cors";

import { Employee } from "./schema/employeeSchema.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
const port = process.env.PORT;

app.get("/getEmployee", async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	try {
		const totalItems = await Employee.countDocuments();
		const user = await Employee.find()
			.limit(limit * 1) // Convert string to number and set the limit
			.skip((page - 1) * limit) // Skip items for previous pages
			.exec();

		res.json({
			totalItems,
			totalPages: Math.ceil(totalItems / limit),
			currentPage: page,
			user,
		});
	} catch (error) {
		res.json({ message: "not found", error: error });
	}
});

app.post("/createEmployee", async (req, res) => {
	const { email } = req.body;
	try {
		const present = await Employee.findOne({ email });
		if (present) {
			console.log("dd", present);
			return res.json({
				message: "user already present",
				sucess: "false",
			});
		}

		const result = await Employee.create(req.body);
		console.log(result);
		res.json({ message: "efndvjkv", data: result });
	} catch (error) {
		console.log(error);
	}
});

app.post("/editEmployee", async (req, res) => {
	try {
		console.log("ll");
		const { _id, email } = req.body;
		const result = await Employee.findOne({ email });
		if (result)
			return res.json({
				message: "user email already exist",
				sucess: false,
			});
		const present = await Employee.replaceOne({ _id }, req.body);

		console.log(present);
		res.json({ message: "updated syccesguly", data: present });
	} catch (error) {
		res.json(error);
	}
});

app.post("/deleteEmployee", async (req, res) => {
	console.log(req.body);
	const { id } = req.body;
	const tt = await Employee.deleteOne({ _id: id });
	res.json({ message: "deletes succesfully", data: tt });
});

app.listen(port, () => {
	connectDb();
	console.log(`server runnint http://localhost:${port}`);
});
