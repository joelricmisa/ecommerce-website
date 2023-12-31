import React, { useState } from "react";
import { resetPassword } from "../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCircleInfo } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useFeedback, useErrorFeedback } from "../hooks";

const formSchema = new yup.ObjectSchema({
    newPassword: yup.string().min(4).max(15).required(),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("newPassword")],
            "it must match with your new password",
        ),
});

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        reset,
        trigger,
        getValues,
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const showFeedback = useFeedback();
    const showError = useErrorFeedback();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        //console.log("trigger reset submit");
        const { newPassword } = getValues();

        setIsLoading(true);

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            const RESET_URL = `/api/reset-password/${token.replace(
                /---/g,
                ".",
            )}`;

            try {
                const response = await axios.post(
                    RESET_URL,
                    JSON.stringify({ newPassword }),
                );

                //console.log(response?.data);

                reset();

                showFeedback(
                    "success",
                    "Your password has been successfully updated!",
                    "alert",
                );

                setIsLoading(false);
                navigate("/signin", { replace: true });
            } catch (err) {
                setIsLoading(false);

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
                <h1 className="text-4xl font-medium">Reset Password</h1>
                <h2 className="mt-5">Enter your new password below </h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newPassword">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="signInput"
                            {...register("newPassword")}
                        />
                    </label>
                    {errors?.newPassword?.message && (
                        <p className="errorMessage mb-1 mt-1">
                            <span className="text-xl">
                                <FaCircleInfo />
                            </span>
                            {errors.newPassword?.message}
                        </p>
                    )}

                    <label htmlFor="confirmPass">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="signInput"
                            {...register("confirmPassword")}
                        />
                    </label>
                    {errors?.confirmPassword?.message && (
                        <p className="errorMessage mb-1 mt-1">
                            <span className="text-xl">
                                <FaCircleInfo />
                            </span>
                            {errors.confirmPassword?.message}
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
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
