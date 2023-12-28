import React, { useContext, useState } from "react";
import { resetPassword } from "../assets/images";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../api/axios";
import { FaCircleInfo } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useFeedback, useErrorFeedback } from "../hooks";

const formSchema = new yup.ObjectSchema({
    email: yup.string().email().required(),
});

const ForgotPassword = () => {
    const {
        register,
        reset,
        getValues,
        trigger,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const showFeedback = useFeedback();
    const showError = useErrorFeedback();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        //console.log("trigger reset btn");
        const { email } = getValues();
        setIsLoading(true);

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            try {
                const response = await axios.post(
                    "/api/forgot-password",
                    JSON.stringify({ email }),
                );

                //console.log(response?.data);
                reset();

                showFeedback(
                    "info",
                    "Check your email to get the reset link for your password.",
                    "modal",
                );

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                // error when email is already used
                setError("email", {
                    type: "custom",
                    message: err.response.data.message,
                });

                showError(err.code);
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
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
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
