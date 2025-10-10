/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { getEnglishDate } from "../lib/base64";

export const EmployeeList = ({
	setSetEmployeeShow,
	setPresentUser,
	presentUser,
}) => {
	const [user, setUser] = useState([]);
	const [search, setSearch] = useState("");
	const [handleSearch, sethandleSearch] = useState("");
	const [sordName, setSortName] = useState("asc");
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage] = useState(10);

	useEffect(() => {
		async function getUser() {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER}/getEmployee`,
				{
					params: {
						page: currentPage,
						limit: itemsPerPage,
					},
				}
			);

			setItems(res.data.totalItems);
			setTotalPages(res.data.totalPages);
			console.log(res.data);
			setUser(res.data.user);
		}

		getUser();
	}, [presentUser, currentPage, itemsPerPage]);

	function handleSeacchChange(e) {
		e.preventDefault();
		setSearch(e.target.value);
		let data = user.filter((t) => {
			return t.name.toLowerCase().includes(search.toLowerCase());
		});
		console.log(data);
		sethandleSearch(data);
	}

	const handleEdit = (data) => {
		setSetEmployeeShow((pre) => !pre);
		setPresentUser(data);
	};

	const handleDelete = async (id) => {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER}/deleteEmployee`,
			{ id }
		);
		if (res) {
			const tt = user.filter((u) => {
				return id != u._id;
			});
			setUser(tt);
			alert("delete sucessful");
		}
	};

	function handleSort(e) {
		let order = sordName;
		let value = e.target.innerHTML.toLowerCase();
		let sortedUser = [...user]; // Create a copy of the original array
		switch (value) {
			case "name":
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.name.localeCompare(b.name);
					} else {
						return b.name.localeCompare(a.name);
					}
				});
				break;

			case "email":
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.email.localeCompare(b.email);
					} else {
						return b.email.localeCompare(a.email);
					}
				});
				break;

			case "gender":
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.gender.localeCompare(b.gender);
					} else {
						return b.gender.localeCompare(a.gender);
					}
				});
				break;

			case "mobileno":
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.mobileNo.localeCompare(b.mobileNo);
					} else {
						return b.mobileNo.localeCompare(a.mobileNo);
					}
				});
				break;

			case "designation":
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.designation.localeCompare(b.designation);
					} else {
						return b.designation.localeCompare(a.designation);
					}
				});
				break;

			case "create date":
				console.log("date");
				sortedUser.sort((a, b) => {
					if (order === "asc") {
						return a.updatedAt.localeCompare(b.updatedAt);
					} else {
						return b.updatedAt.localeCompare(a.updatedAt);
					}
				});
				break;
		}
		setUser(sortedUser); // Update the user state
		setSortName((pre) => {
			if (pre == "asc") return "dec";
			return "asc";
		});
		return sortedUser;
	}

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="relative">
			<div className="w-full h-7 bg-red-500">
				<span className="ml-10">Total Count:{items}</span>
				<span className="ml-10">
					Base On Name:
					<input
						type="text"
						onChange={handleSeacchChange}
						value={search}
					/>
				</span>
			</div>
			<table className="w-11/12">
				<tr className="border ">
					<td className="order border-slate-300">UniqueOd</td>
					<td className="order border-slate-300">Image</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						Name
					</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						Email
					</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						MObileNo
					</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						Designation
					</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						Gender
					</td>
					<td className="order border-slate-300">Courses</td>
					<td
						className="order border-slate-300"
						onClick={(e) => handleSort(e)}
					>
						Create date
					</td>
					<td className="order border-slate-300">action</td>
				</tr>
				{user &&
					user.map((data) => (
						<tr key={data._id} className="border ">
							<td className="border border-slate-300">
								{data._id}
							</td>
							<td className="border border-slate-300">
								<img className="w-6 h-6" src={data.image} />
							</td>
							<td className="border border-slate-300">
								{data.name}
							</td>
							<td className="border border-slate-300">
								{data.email}
							</td>
							<td className="border border-slate-300">
								{data.mobileNo}
							</td>
							<td className="border border-slate-300">
								{data.designation}
							</td>
							<td className="border border-slate-300">
								{data.gender}
							</td>
							<td className="border border-slate-300 ">
								{data.courses &&
									data.courses.map((cou, index) => (
										<span key={index}> {cou}, </span>
									))}
							</td>
							<td className="border border-slate-300">
								{getEnglishDate(data.createdAt)}
							</td>
							<td className="border border-slate-300 ">
								<span>
									<button
										onClick={() => handleEdit(data)}
										className="border m-2 hover:bg-teal-400"
									>
										Edit
									</button>
								</span>
								<span>
									<button
										onClick={() => handleDelete(data._id)}
										className="border hover:bg-orange-800"
									>
										Delete
									</button>
								</span>
							</td>
						</tr>
					))}
			</table>
			<div className="fixed top-[36rem] left-[38rem] ">
				<span className="mr-6">
					{" "}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="border rounded-md p-2 bg-green-600"
					>
						pre
					</button>{" "}
				</span>
				<span className="pr-5">{currentPage}</span>
				<span>
					{" "}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="border rounded-md p-2 bg-green-600"
					>
						next
					</button>
				</span>
				<span className="pl-5">{totalPages}</span>
			</div>
			{/* searching */}
			<div className="absolute top-7 left-80 ">
				{search && (
					<div className="relative top-0 bg-green-700">
						total:{handleSearch.length}
					</div>
				)}
				{handleSearch &&
					search &&
					handleSearch.map((res, index) => {
						return (
							<div
								className="relative top-0 bg-green-700"
								key={index}
							>
								{res.name}
							</div>
						);
					})}
			</div>
		</div>
	);
};
