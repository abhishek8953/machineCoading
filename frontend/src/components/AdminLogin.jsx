import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const realUsername="admin"
const realPassword="1234"

const AdminLogin = ({setLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const navigate=useNavigate();


    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
	

		if(realUsername== username && realPassword ==password){
            localStorage.setItem(
                "login",
                JSON.stringify({ username: "admin", password: "1234" })
            );
			console.log("login sucess");
			setLogin(true)
			navigate("/dashboard")
			
		}

		else{
			alert("wrond user name and password")
		}

		
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-green-500 rounded "
                    >
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export {AdminLogin};
