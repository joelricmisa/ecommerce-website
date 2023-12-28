import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInImg } from "../assets/images";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useFeedback, useErrorFeedback, useAuth } from "../hooks";

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
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const LOGIN_URL = "/api/auth";
    const { auth, setAuth } = useAuth();
    const showFeedback = useFeedback();
    const showError = useErrorFeedback();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (auth) {
            navigate(from, { replace: true });
        }
    }, [auth]);

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        //console.log("trigger submit");
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
                );

                //console.log(response?.data);

                const accessToken = response?.data?.accessToken;
                const role = response?.data?.role;
                const user = response?.data?.user;
                setAuth({ user, role, accessToken });

                reset();
                navigate(from, { replace: true });

                showFeedback("info", `Authenticated as ${user}.`, "alert");

                setIsLoading(false);
                //console.log(response?.data);
            } catch (err) {
                setIsLoading(false);

                console.log(err);

                showError(err.code, err.response.data.message);
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
