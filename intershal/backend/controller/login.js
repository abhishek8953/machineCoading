import { User } from "../schema/userSchema.js";

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!user && !password)
			return res.json({
				message: "please enter credeitials",
				login: false,
			});

		const user = await User.findOne({ username });

		if (!user) return res.json({ message: "username not found" });
		if (user.password === password)
			return res.json({ message: "login succesfull", login: true });
		else {
			return res.json({ message: "login unsuccesfull", login: false });
		}
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
};
