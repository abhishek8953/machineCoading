import { useState } from "react";
import { AdminLogin } from "./components/AdminLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";


function App() {
	

	const [login, setLogin] = useState(false);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={<AdminLogin setLogin={setLogin} />}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute login={login}>
								<Dashboard setLogin={setLogin}  />
							</ProtectedRoute>
						}
					/>

					
					

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
