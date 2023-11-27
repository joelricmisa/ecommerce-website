import React from "react";
import { resetPassword } from "../assets/images";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../api/axios";
import { FaCircleInfo } from "react-icons/fa6";

const formSchema = new yup.ObjectSchema({
    email: yup.string().email().required(),
});

const ForgotPassword = () => {
    const {
        register,
        reset,
        getValues,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger reset btn");
        const { email } = getValues();

        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();

            try {
                const response = await axios.post(
                    "/api/forgot-password",
                    JSON.stringify({ email }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);
                reset();
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className="animate flex flex-col xl:flex-row">
            <img
                src={resetPassword}
                alt=""
                className="min-h-[100px] xl:w-7/12 "
            />
            <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
                <h1 className="text-4xl font-medium">Forgot Password?</h1>
                <h2 className="mt-5">Enter your details below</h2>

                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <input
                            type="email"
                            placeholder="Email"
                            className="signInput"
                            {...register("email")}
                        />
                    </label>
                    {errors?.email?.message && (
                        <p className="errorMessage">
                            <span className="text-xl">
                                <FaCircleInfo />
                            </span>
                            {errors.email?.message}
                        </p>
                    )}

                    <div className="flex-center mt-5 w-full flex-wrap py-4">
                        <button type="submit" className="button mx-0 xl:w-1/2">
                            Reset Password
                        </button>
                        <Link to={"/signin"} className="link text-tertiary-100">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
