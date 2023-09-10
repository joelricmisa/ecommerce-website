import { Link } from "react-router-dom";
import { signUpImage } from "../assets/images";
import { google } from "../assets/logo";

const SignUp = () => {
  return (
    <div className="animate flex flex-col xl:flex-row">
      <img src={signUpImage} alt="" className="min-h-[100px] xl:w-7/12 " />
      <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
        <h1 className="text-4xl font-medium">Create an account</h1>
        <h2 className="mt-5 ">Enter your details below</h2>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="signInput"
          />
        </label>
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
        <button className="button mt-10 w-full">Create Account</button>
        <button className="flex-center mt-5 w-full rounded-sm py-4 outline outline-1 outline-black/50">
          <img src={google} alt="" /> Sign up with Google
        </button>
        <div className="flex-center mt-5 flex-wrap py-4">
          <p>Already have account?</p>
          <Link to={"/signin"} className="link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
