import React from "react";
import { resetPassword } from "../assets/images";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="animate flex flex-col xl:flex-row">
      <img src={resetPassword} alt="" className="min-h-[100px] xl:w-7/12 " />
      <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
        <h1 className="text-4xl font-medium">Forgot Password?</h1>
        <h2 className="mt-5">Enter your details below</h2>

        <label htmlFor="name">
          <input
            type="name"
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

        <div className="flex-center mt-5 w-full flex-wrap py-4">
          <button className="button mx-0 xl:w-1/2">Reset Password</button>
          <Link to={"/signin"} className="link text-tertiary-100">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
