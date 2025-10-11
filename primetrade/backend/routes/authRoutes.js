import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post(
	"/signup",
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("Invalid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 chars"),
	async (req, res, next) => {
		try {
           
            
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() });

			const { name, email, password ,role} = req.body;
			const exists = await User.findOne({ email });
			if (exists)
				return res
					.status(400)
					.json({ message: "Email already exists" });

			const user = new User({ name, email, password ,role});
			await user.save();
			const token = jwt.sign(
				{ id: user._id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);

			res.json({
				token,
				user: { name: user.name, email: user.email, role: user.role },
			});
		} catch (err) {
			next(err);
		}
	}
);

// Login
router.post(
	"/login",
	body("email").isEmail().withMessage("Invalid email"),
	body("password").notEmpty().withMessage("Password is required"),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() });

			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user)
				return res.status(400).json({ message: "Invalid credentials" });

			const match = await user.comparePassword(password);
			if (!match)
				return res.status(400).json({ message: "Invalid credentials" });

			const token = jwt.sign(
				{ id: user._id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);
			res.json({
				token,
				user: { name: user.name, email: user.email, role: user.role },
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
