import { useForm } from "react-hook-form";
import { Breadcrumb } from "../components/index";
import { FaCircleInfo, FaEnvelope, FaPhone } from "react-icons/fa6";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";
import axios from "../api/axios";
import { FaSpinner } from "react-icons/fa";

const formSchema = new yup.ObjectSchema({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
        .number("it must be a number")
        .typeError("phone must be a number")
        .required(),
    message: yup.string().required(),
});

const Contact = () => {
    const {
        register,
        trigger,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const { setType, setMessage, setShowAlert } = useContext(FeedbackContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger send");
        setIsLoading(true);

        const { name, email, message, phone } = getValues();

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            try {
                const response = await axios.post(
                    "/api/contact",
                    JSON.stringify({ name, email, message, phone }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);

                reset();

                setIsLoading(false);
                setType("success");
                setShowAlert(true);
                setMessage(`Message sent successfully!`);
                console.log(response?.data);
            } catch (err) {
                setIsLoading(false);

                console.log(err);
            }
        }
    };

    return (
        <div className=" padding animate  mb-20 w-full !py-0">
            <Breadcrumb />
            <div className="flex flex-col gap-10 xl:flex-row">
                <div className="px-8 py-10 text-sm shadow-md xl:w-4/12">
                    <div className="flex flex-col gap-4 border-b border-black/10 pb-10 pr-10 xl:pl-5">
                        <span className="flex-center justify-start font-medium">
                            <FaEnvelope className="border-1 rounded-full  border-white bg-tertiary-100 fill-white p-2 text-4xl" />
                            <h1>Call To Us</h1>
                        </span>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p>Phone: +632-8888-1227</p>
                    </div>

                    <div className="flex flex-col gap-4 pr-10 pt-10 xl:pl-5">
                        <span className="flex-center justify-start font-medium">
                            <FaPhone className="border-1  rounded-full border-white bg-tertiary-100 fill-white p-2 text-4xl" />
                            <h1>Write To US</h1>
                        </span>
                        <p>
                            Fill out our form and we will contact you within 24
                            hours.
                        </p>
                        <p className="flex flex-wrap gap-3 leading-6">
                            Emails:
                            <span>
                                customer@exclusive.com <br />
                                support@exclusive.com
                            </span>
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-8 py-10 shadow-md xl:w-8/12"
                >
                    <h1 className="mb-10 text-center font-inter text-2xl font-medium">
                        Start a conversation.
                    </h1>

                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="input mb-3"
                            placeholder="Your Name *"
                            {...register("name")}
                        />

                        {errors?.name?.message && (
                            <p className="errorMessage -mt-2 mb-3">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.name?.message}
                            </p>
                        )}

                        <label htmlFor="email">Email:</label>

                        <input
                            type="email"
                            className="input mb-3"
                            placeholder="Your Email *"
                            {...register("email")}
                        />
                        {errors?.email?.message && (
                            <p className="errorMessage -mt-2 mb-3">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.email?.message}
                            </p>
                        )}

                        <label htmlFor="phone">Phone Number:</label>

                        <input
                            type="number"
                            min="0"
                            maxLength="11"
                            className="input mb-3"
                            placeholder="Your Phone *"
                            {...register("phone")}
                        />
                        {errors?.phone?.message && (
                            <p className="errorMessage -mt-2 mb-3">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.phone?.message}
                            </p>
                        )}

                        <label htmlFor="phone">Message:</label>

                        <textarea
                            type="text"
                            className="input mb-3 h-full w-full"
                            placeholder="Your Message"
                            rows={5}
                            {...register("message")}
                        />
                        {errors?.message?.message && (
                            <p className="errorMessage  -mt-2 mb-3">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.message?.message}
                            </p>
                        )}
                    </div>

                    <button className="button xl:w-2/5" type="submit">
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <FaSpinner className="animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
