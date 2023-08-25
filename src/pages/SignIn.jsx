import { Link } from "react-router-dom";
import { signUpImg } from "../assets/images";

const SignIn = () => {
	return (
		<div className="flex h-[700px] font-poppins ">
			<img src={signUpImg} alt="" className="w-7/12 " />
			<div className="w-5/12 sm:px-20 px-10 my-auto">
				<h1 className="text-4xl font-medium">Log in to Exclusive</h1>
				<h2 className="text-base mt-5">Enter your details below</h2>

				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signInput" />
				</label>
				<label htmlFor="pass">
					<input type="password" name="pass" id="pass" placeholder="Password" className="signInput" />
				</label>

				<div className="flex justify-evenly items-center py-4 mt-5 gap-4 w-full">
					<button className="py-3  w-1/2 bg-secondary rounded-sm text-white font-medium">Log in</button>
					<Link to={"/forgot"} className="underline underline-offset-2 text-secondary">
						Forget Password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
