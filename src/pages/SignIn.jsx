import { Link } from "react-router-dom";
import { signInImg } from "../assets/images";

const SignIn = () => {
  return (
    <div className="animate flex flex-col xl:flex-row">
      <img src={signInImg} alt="" className="min-h-[100px] xl:w-7/12 " />
      <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
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

        <div className="flex-center mt-5 w-full flex-wrap py-4">
          <button className="button xl:w-1/2">Log in</button>
          <Link to={"/forgot"} className="link text-tertiary-100">
            Forget Password?
          </Link>
        </div>
        <div className="flex-center mt-5 flex-wrap py-4">
          <p>Don't have an account yet?</p>
          <Link to={"/signup"} className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
