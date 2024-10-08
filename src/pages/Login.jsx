import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetStarted from "../components/GetStarted";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/auth/authSlice";

const Login = () => {
	const [isLoggedInTg, setLoggedInTg] = useState(false);
	const [userData, setUserData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isError, isLoading, isSuccess } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isSuccess || user) {
			navigate("/"); // Navigate to home if already authenticated
		}
	}, [isSuccess, user, navigate]);

	useEffect(() => {
		if (window.Telegram.WebApp.initData !== "") {
			setLoggedInTg(true);
			setUserData({
				data: window.Telegram.WebApp.initData,
			});
		} else {
			setLoggedInTg(false);
		}
	}, []);

	const handleSendData = async () => {
		if (isLoggedInTg && userData) {
			try {
				await dispatch(createUser(userData));
			} catch (error) {
				console.error("Error logging in:", error);
			}
		}
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center h-screen">
			{isLoggedInTg ? (
				<GetStarted handleStart={handleSendData} isLoading={isLoading} />
			) : (
				<div className="flex flex-col items-center justify-center h-screen">
					<p className="text-xl">Please Login to Telegram.</p>
					<a
						href="https://web.telegram.org/a/"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-blue-500 text-white px-4 py-2 rounded inline-block mt-4"
					>
						Login
					</a>
				</div>
			)}
		</div>
	);
};

export default Login;
