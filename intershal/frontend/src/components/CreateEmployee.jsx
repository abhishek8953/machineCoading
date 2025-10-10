import { useState } from "react";
import axios from "axios";
import { convertToBase64 } from "../lib/base64";

// eslint-disable-next-line react/prop-types
export const CreateEmployee = ({ setCreatEmployeeShow }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		mobileNo: "",
		designation: "",
		gender: "",
		courses: [],
		image: null,
	});
	const [errors, setErrors] = useState({});

	const availableCourses = ["MCA", "BCA", "BSC"];

	const validate = () => {
		let formErrors = {};
		if (!formData.name) formErrors.name = "Name is required";
		if (!formData.email) formErrors.email = "Email is required";
		//some regex i take from online
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			formErrors.email = "Email is invalid";
		if (!formData.mobileNo)
			formErrors.mobileNo = "Mobile Number is required";
		else if (!/^\d{10}$/.test(formData.mobileNo))
			formErrors.mobileNo = "Mobile Number must be 10 digits";

		if (!formData.designation)
			formErrors.designation = "Designation is required";
		if (!formData.gender) formErrors.gender = "Gender is required";
		if (formData.courses.length === 0)
			formErrors.courses = "At least one course must be selected";

		if (
			!formData.image.name.includes("jpg") &&
			!formData.image.name.includes("png")
		) {
			formErrors.image = "image must jpg/png";
			console.log("fff", formErrors.image);
		}

		return formErrors;
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCheckboxChange = (e) => {
		const selectedCourses = [...formData.courses];
		if (e.target.checked) {
			selectedCourses.push(e.target.value);
		} else {
			const index = selectedCourses.indexOf(e.target.value);
			selectedCourses.splice(index, 1);
		}
		setFormData({
			...formData,
			courses: selectedCourses,
		});
	};

	const handleFileChange = (e) => {
		setFormData({
			...formData,
			image: e.target.files[0],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = validate();
		if (Object.keys(formErrors).length === 0) {
			convertToBase64(formData.image).then(async (file) => {
				console.log(file);
				const res = await axios.post(
					`${import.meta.env.VITE_SERVER}/createEmployee`,
					{
						...formData,
						image: file,
					}
				);
				if (res.data.sucess === "false") {
					alert(res.data.message + " or email already present");
				}
				else{
					setCreatEmployeeShow((pre)=>!pre)
				}
			});
		} else {
			setErrors(formErrors);
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-5 p-4 bg-gray-100 rounded shadow-lg">
			<h2 className="text-2xl font-bold text-center">
				Create Employee{" "}
				<span className="ml-11 ">
					<button
						onClick={() => setCreatEmployeeShow((pre) => !pre)}
						className="border cursor-pointer rounded-xl hover:bg-red-500 w-10 text-green-600"
					>
						x
					</button>
				</span>
			</h2>
			<form onSubmit={handleSubmit} className="mt-4">
				<div className="mb-4">
					<label className="block text-gray-700">Name</label>
					<input
						type="text"
						name="name"
						className="w-full p-2 border rounded"
						value={formData.name}
						onChange={handleChange}
					/>
					{errors.name && (
						<p className="text-red-500">{errors.name}</p>
					)}
				</div>

				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						className="w-full p-2 border rounded"
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<p className="text-red-500">{errors.email}</p>
					)}
				</div>

				<div className="mb-4">
					<label className="block text-gray-700">Mobile Number</label>
					<input
						type="text"
						name="mobileNo"
						className="w-full p-2 border rounded"
						value={formData.mobileNo}
						onChange={handleChange}
					/>
					{errors.mobileNo && (
						<p className="text-red-500">{errors.mobileNo}</p>
					)}
				</div>

				<div className="mb-4">
					<label className="block text-gray-700">Designation</label>
					<select
						name="designation"
						className="w-full p-2 border rounded"
						value={formData.designation}
						onChange={handleChange}
					>
						<option value="">Select Designation</option>
						<option value="hr">Hr</option>
						<option value="manager">Manager</option>
						<option value="sells">Sells</option>
					</select>
					{errors.designation && (
						<p className="text-red-500">{errors.designation}</p>
					)}
				</div>

				{/* Gender */}
				<div className="mb-4">
					<label className="block text-gray-700">Gender</label>
					<label>
						<input
							type="radio"
							name="gender"
							value="male"
							checked={formData.gender === "male"}
							onChange={handleChange}
						/>{" "}
						Male
					</label>
					<label className="ml-4">
						<input
							type="radio"
							name="gender"
							value="female"
							checked={formData.gender === "female"}
							onChange={handleChange}
						/>{" "}
						Female
					</label>
					{errors.gender && (
						<p className="text-red-500">{errors.gender}</p>
					)}
				</div>

				{/* Courses with checkboxes */}
				<div className="mb-4">
					<label className="block text-gray-700">Courses</label>
					{availableCourses.map((course, index) => (
						<label key={index} className="block">
							<input
								type="checkbox"
								value={course}
								onChange={handleCheckboxChange}
							/>{" "}
							{course}
						</label>
					))}
					{errors.courses && (
						<p className="text-red-500">{errors.courses}</p>
					)}
				</div>

				{/* Image Upload */}
				<div className="mb-4">
					<label className="block text-gray-700">Upload Image</label>
					<input
						type="file"
						name="image"
						className="w-full"
						onChange={handleFileChange}
					/>
					{errors.image && (
						<p className="text-red-500">{errors.image}</p>
					)}
				</div>

				{/* Submit Button */}
				<div className="text-center">
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
