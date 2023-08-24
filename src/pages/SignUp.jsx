import { Link, useNavigate } from "react-router-dom";
import { signUpImg } from "../assets/images";
import { google } from "../assets/logo";
import { v4 as uuid } from "uuid";

const SignUp = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-[700px] font-poppins ">
			<img src={signUpImg} alt="" className="w-7/12 " />
			<div className="w-5/12 sm:px-20 px-10 my-auto">
				<h1 className="text-4xl font-medium">Create an account</h1>
				<h2 className="text-base mt-5">Enter your details below</h2>
				<label htmlFor="name">
					<input type="text" name="name" id="name" placeholder="Name" className="signUpInput" />
				</label>
				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signUpInput" />
				</label>
				<label htmlFor="pass">
					<input type="password" name="pass" id="pass" placeholder="Password" className="signUpInput" />
				</label>
				<button className="mt-5 py-4 w-full bg-secondary rounded-sm text-white">Create Account</button>
				<button className="mt-5 py-4 w-full outline outline-black/50 outline-1 flex justify-center items-center gap-4 rounded-sm">
					<img src={google} alt="" /> Sign up with Google
				</button>
				<div className="flex justify-center items-center py-4 mt-5 gap-4 w-full">
					<p>Already have account?</p>
					<Link
						to={"/signin"}
						onClick={(e) => {
							e.preventDefault();
							navigate("/signin", { state: uuid() });
						}}
						className="underline underline-offset-2">
						Log in
					</Link>
					<a href="/signin">login</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
