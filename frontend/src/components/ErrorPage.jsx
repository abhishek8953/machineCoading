// ErrorPage.js

import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
                <Link to="/login" className="mt-6 text-blue-500 hover:underline">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
