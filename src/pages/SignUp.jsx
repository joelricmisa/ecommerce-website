import { Link } from "react-router-dom";
import { signUpImage } from "../assets/images";
import { google } from "../assets/logo";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCircleInfo } from "react-icons/fa6";

const formSchema = new yup.ObjectSchema({
    name: yup.string().max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
});

const SignUp = () => {
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

    const REGISTER_URL = "/api/register";
    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger submit");

        const { name, email, password } = getValues();

        if (!isValid) {
            e.preventDefault();
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

                reset();
            } catch (err) {
                console.log(err);
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
                        Create Account
                    </button>
                </form>

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
