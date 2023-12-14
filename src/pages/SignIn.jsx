import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInImg } from "../assets/images";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCircleInfo } from "react-icons/fa6";
import { useContext, useState } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";
import { FaSpinner } from "react-icons/fa";

const formSchema = new yup.ObjectSchema({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
});

const SignIn = () => {
    const {
        register,
        trigger,
        reset,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const LOGIN_URL = "/api/auth";
    const { setAuth } = useAuth();
    const { setType, setMessage, setShowAlert, setModalMessage, setShowModal } =
        useContext(FeedbackContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger submit");
        setIsLoading(true);
        const { email, password } = getValues();

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            try {
                const response = await axios.post(
                    LOGIN_URL,
                    JSON.stringify({ email, password }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);

                const accessToken = response?.data?.accessToken;
                const role = response?.data?.role;
                const user = response?.data?.user;
                setAuth({ user, role, accessToken });

                reset();
                navigate("/", { replace: true });

                setType("info");
                setShowAlert(true);
                setMessage(`Authenticated as ${user}.`);
                setIsLoading(false);
                console.log(response?.data);
            } catch (err) {
                setIsLoading(false);

                switch (err.code) {
                    case "ERR_NETWORK":
                        setType("error");
                        setShowModal(true);
                        setModalMessage(
                            "Something went wrong with your network connection. Please try again once your connection is stable. ",
                        );
                        break;

                    case "ERR_BAD_REQUEST":
                        setType("error");
                        setShowModal(true);
                        setModalMessage(err.response.data.message);
                        break;

                    default:
                        setType("error");
                        setShowModal(true);
                        setModalMessage(
                            "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                        );
                        break;
                }

                console.log(err);
            }
        }
    };

    return (
        <div className="animate flex flex-col xl:flex-row">
            <img src={signInImg} alt="" className="min-h-[100px] xl:w-7/12 " />
            <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
                <h1 className="text-4xl font-medium">Log in to Exclusive</h1>
                <h2 className="mt-5">Enter your details below</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <input
                            type="email"
                            id="email"
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

                    <label htmlFor="pass">
                        <input
                            type="password"
                            id="pass"
                            placeholder="Password"
                            className="signInput"
                            {...register("password")}
                        />
                    </label>
                    {errors?.password?.message && (
                        <p className="errorMessage">
                            <span className="text-xl">
                                <FaCircleInfo />
                            </span>
                            {errors.password?.message}
                        </p>
                    )}

                    <div className="flex-center mt-10 w-full flex-wrap py-4">
                        <button type="submit" className="button xl:w-1/2">
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin" />
                                    Logging in...
                                </span>
                            ) : (
                                "Log in"
                            )}
                        </button>

                        <Link
                            to={"/forgot"}
                            className="link inline-block w-1/2 text-center text-tertiary-100 xl:w-auto"
                        >
                            Forget Password?
                        </Link>
                    </div>
                </form>
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
