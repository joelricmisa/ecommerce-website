import { Link } from "react-router-dom";
import { signUpImg } from "../assets/images";

const SignIn = () => {
	return (
		<div className="flex h-[700px] ">
			<img src={signUpImg} alt="" className="w-7/12 " />
			<div className="w-5/12 sm:px-20 px-10 my-auto">
				<h1 className="text-4xl font-medium">Log in to Exclusive</h1>
				<h2 className="mt-5">Enter your details below</h2>

				<label htmlFor="email">
					<input type="email" name="email" id="email" placeholder="Email" className="signInput" />
				</label>
				<label htmlFor="pass">
					<input type="password" name="pass" id="pass" placeholder="Password" className="signInput" />
				</label>

				<div className="flex-center py-4 mt-5  w-full">
					<button className="button w-1/2">Log in</button>
					<Link to={"/forgot"} className="link text-secondary">
						Forget Password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
