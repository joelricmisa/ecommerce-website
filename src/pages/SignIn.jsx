import { Link } from "react-router-dom";
import { signUpImg } from "../assets/images";

const SignIn = () => {
	return (
		<div className="flex flex-col xl:flex-row ">
			<img src={signUpImg} alt="" className="xl:w-7/12 min-h-[100px] " />
			<div className="xl:w-5/12 sm:px-20 px-10 my-auto padding-y">
				<h1 className="text-4xl font-medium">Log in to Exclusive</h1>
				<h2 className="mt-5">Enter your details below</h2>

				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signInput" />
				</label>
				<label htmlFor="pass">
					<input type="password" name="pass" id="pass" placeholder="Password" className="signInput" />
				</label>

				<div className="flex-center flex-wrap py-4 mt-5  w-full">
					<button className="button xl:w-1/2">Log in</button>
					<Link to={"/forgot"} className="link text-tertiary-100">
						Forget Password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
