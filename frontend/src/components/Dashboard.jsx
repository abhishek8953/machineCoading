import { useState } from "react";
import { CreateEmployee } from "./CreateEmployee";
import { EmployeeList } from "./EmployeeList";
import { EditEmployee } from "./EditEmployee";
import { Navigate, useNavigate } from "react-router-dom";
// import { EmployeeList } from "./EmployeeList";

export const Dashboard = ({ setLogin }) => {
	const [empList, setEmpList] = useState(false);
	const [createEmployeeShow, setCreatEmployeeShow] = useState(false);
	const [setEmployeeShow, setSetEmployeeShow] = useState(false);
	const [presentUser, setPresentUser] = useState(false);

	let user = localStorage.getItem("login") || "";
	user = JSON.parse(user);
	const navigate = useNavigate();

	return (
		<div className="relative">
			<div className="flex gap-x-40 h-8 bg-yellow-300 items-center">
				<span className="cursor-pointer">Home</span>
				<span
					className="cursor-pointer"
					onClick={() => setEmpList(!empList)}
				>
					EmployeeList
				</span>
				<span
					className="cursor-pointer"
					onClick={() => {
						setCreatEmployeeShow(!createEmployeeShow);
					}}
				>
					CreateEmployee
				</span>
				<span className="cursor-pointer"> {user.username} </span>
				<span
					className="cursor-pointer"
					onClick={() => {
						localStorage.removeItem("login");
						setLogin(false);

						navigate("/login");
					}}
				>
					Logout
				</span>
			</div>

			<div>
				<div className="absolute z-10 left-80">
					{setEmployeeShow && (
						<EditEmployee
							setPresentUser={setPresentUser}
							presentUser={presentUser}
							setSetEmployeeShow={setSetEmployeeShow}
						/>
					)}
				</div>
			</div>

			<div>
				{empList && (
					<EmployeeList
						presentUser={presentUser}
						setPresentUser={setPresentUser}
						setSetEmployeeShow={setSetEmployeeShow}
					/>
				)}
			</div>
			<div className="absolute top-0 left-80">
				{createEmployeeShow && (
					<CreateEmployee
						setCreatEmployeeShow={setCreatEmployeeShow}
					/>
				)}
			</div>
		</div>
	);
};
