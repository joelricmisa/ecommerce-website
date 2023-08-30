import { Link } from "react-router-dom";
import { signUpImg } from "../assets/images";
import { google } from "../assets/logo";

const SignUp = () => {
	return (
		<div className="flex flex-col xl:flex-row animate">
			<img src={signUpImg} alt="" className="xl:w-7/12 min-h-[100px]" />
			<div className="xl:w-5/12 sm:px-20 px-10 my-auto padding-y">
				<h1 className="text-4xl font-medium">Create an account</h1>
				<h2 className=" mt-5">Enter your details below</h2>
				<label htmlFor="name">
					<input type="text" name="name" id="name" placeholder="Name" className="signInput" />
				</label>
				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signInput" />
				</label>
				<label htmlFor="pass">
					<input type="password" name="pass" id="pass" placeholder="Password" className="signInput" />
				</label>
				<button className="button w-full mt-10">Create Account</button>
				<button className="mt-5 py-4 w-full outline outline-black/50 outline-1 flex-center rounded-sm">
					<img src={google} alt="" /> Sign up with Google
				</button>
				<div className="flex-center flex-wrap py-4 mt-5">
					<p>Already have account?</p>
					<Link to={"/signin"} className="link">
						Log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
