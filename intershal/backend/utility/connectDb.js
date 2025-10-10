import mongoose from "mongoose";

export async function connectDb() {
	try {
		const res = await mongoose.connect(process.env.DB_URI);
		if (res) {
			console.log("DB connected");
		}
	} catch (error) {
		console.log(error);
	}
}
