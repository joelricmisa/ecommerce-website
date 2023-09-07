import React from "react";
import { resetPassword } from "../assets/images";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	return (
		<div className="flex flex-col xl:flex-row animate">
			<img src={resetPassword} alt="" className="xl:w-7/12 min-h-[100px] " />
			<div className="xl:w-5/12 sm:px-20 px-10 my-auto padding-y">
				<h1 className="text-4xl font-medium">Forgot Password?</h1>
				<h2 className="mt-5">Enter your details below</h2>

				<label htmlFor="name">
					<input type="name" name="name" id="name" placeholder="Name" className="signInput" />
				</label>
				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signInput" />
				</label>

				<div className="flex-center  flex-wrap py-4 mt-5  w-full">
					<button className="button mx-0 xl:w-1/2">Reset Password</button>
					<Link to={"/signin"} className="link  text-tertiary-100">
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
