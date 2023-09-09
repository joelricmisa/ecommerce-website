import { Link } from "react-router-dom";
import { signInImg } from "../assets/images";

const SignIn = () => {
	return (
		<div className="flex flex-col xl:flex-row animate">
			<img
				src={signInImg}
				alt=""
				className="xl:w-7/12 min-h-[100px] "
			/>
			<div className="px-10 my-auto xl:w-5/12 sm:px-20 padding-y">
				<h1 className="text-4xl font-medium">Log in to Exclusive</h1>
				<h2 className="mt-5">Enter your details below</h2>

				<label htmlFor="email">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						className="signInput"
					/>
				</label>
				<label htmlFor="pass">
					<input
						type="password"
						name="pass"
						id="pass"
						placeholder="Password"
						className="signInput"
					/>
				</label>

				<div className="flex-wrap w-full py-4 mt-5 flex-center">
					<button className="button xl:w-1/2">Log in</button>
					<Link
						to={"/forgot"}
						className="link text-tertiary-100">
						Forget Password?
					</Link>
				</div>
				<div className="flex-wrap py-4 mt-5 flex-center">
					<p>Don't have an account yet?</p>
					<Link
						to={"/signup"}
						className="link">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
