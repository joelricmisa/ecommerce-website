import { Link, useNavigate } from "react-router-dom";
import { signUpImage } from "../assets/images";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCircleInfo, FaGoogle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { useContext, useState } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";
import { FaSpinner } from "react-icons/fa";

const formSchema = new yup.ObjectSchema({
    name: yup.string().max(15).required(),
    email: yup.string().email().max(25).required(),
    password: yup.string().min(4).max(15).required(),
});

const SignUp = () => {
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
    const { setType, setMessage, setShowAlert, setShowModal, setModalMessage } =
        useContext(FeedbackContext);
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const REGISTER_URL = "/api/register";
    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger submit");
        setIsLoading(true);

        const { name, email, password } = getValues();

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();
            try {
                const response = await axios.post(
                    REGISTER_URL,
                    JSON.stringify({ name, email, password }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);

                try {
                    const response = await axios.post(
                        "/api/auth",
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

                    setIsLoading(false);
                    reset();

                    navigate("/", { replace: true });

                    setType("info");
                    setShowAlert(true);
                    setMessage(
                        `Created an account successfully and authenticated it as ${email}.`,
                    );
                } catch (err) {
                    navigate("/signin", { replace: true });
                    // console.log(err);
                }
            } catch (err) {
                // console.log(err);
                // console.log(err.code);

                setIsLoading(false);

                if (err.code === "ERR_NETWORK") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Something went wrong with your network connection. Please try again once your connection is stable. ",
                    );
                }

                if (err.code === "ERR_BAD_RESPONSE") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                    );
                }
            }
        }
    };

    return (
        <div className="animate flex flex-col xl:flex-row">
            <img
                src={signUpImage}
                alt=""
                className="min-h-[100px] xl:w-7/12 "
            />
            <div className="padding-y my-auto px-10 sm:px-20 xl:w-5/12">
                <h1 className="text-4xl font-medium">Create an account</h1>
                <h2 className="mt-5 ">Enter your details below</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="signInput"
                            {...register("name")}
                        />
                    </label>
                    {errors?.name?.message && (
                        <p className="errorMessage">
                            <span className="text-xl">
                                <FaCircleInfo />
                            </span>
                            {errors.name?.message}
                        </p>
                    )}

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
                            id="password"
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

                    <button type="submit" className="button mt-10 w-full">
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <FaSpinner className="animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

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
