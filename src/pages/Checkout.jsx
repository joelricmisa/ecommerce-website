import React, { useState } from "react";
import { Breadcrumb } from "../components";
import { billingDetails } from "../constants";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { visa, masterCard } from "../assets/logo";
import { FaCartShopping, FaCircleInfo } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FeedbackContext from "../contexts/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CheckoutProductCard from "../components/CheckoutProductCard";

const formSchema = new yup.ObjectSchema({
    name: yup.string().required(),
    street: yup.string().required(),
    apartment: yup.string().optional(),
    city: yup.string().required(),
    phone: yup.number().typeError("phone must be a number").required(),
    email: yup.string().email().max(25).required(),
    payment: yup.string().required("please select a payment method"),
});
const Checkout = () => {
    const { cartItems, totalAmount } = useContext(ShopContext);
    const {
        setType,
        setModalMessage,
        setShowModal,
        setShowAlert,
        setLoadingMessage,
        setShowLoadingOverlay,
    } = useContext(FeedbackContext);
    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    const showVal = cartItems?.length - 5;
    const [showItem, setShowItem] = useState(false);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { auth } = useAuth();

    const { data: currentUser } = useQuery({
        queryKey: ["checkout"],

        queryFn: async () => {
            //cart
            localStorage.removeItem("cartIds");

            const response = await axiosPrivate.get("/api/users/current");

            return response?.data?.data;
        },
        enabled: !!auth,
    });

    const {
        register,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const handleSubmit = async (e) => {
        const isValid = await trigger();
        console.log("trigger submit");

        setLoadingMessage("Processing");
        setShowLoadingOverlay(true);
        console.log(e);

        if (!isValid) {
            e.preventDefault();
            setShowLoadingOverlay(false);
        } else {
            e.preventDefault();

            if (currentUser) {
                try {
                    await axiosPrivate.put(
                        `/api/users/${currentUser?._id}`,
                        {
                            ...currentUser,
                            cart: [],
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        },
                    );

                    localStorage.removeItem("cartIds");

                    queryClient.invalidateQueries({
                        queryKey: ["currentUser"],
                    });

                    reset();

                    setShowLoadingOverlay(false);

                    navigate("/");
                    setShowAlert(false);
                    setType("success");
                    setShowModal(true);
                    setModalMessage(
                        `Thank you for your purchase, your order has been placed successfully.`,
                    );
                } catch (err) {
                    console.log(err);

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
        }
    };

    return (
        <div className="padding-x animate">
            <Breadcrumb />
            <h1 className="font-inter text-3xl font-medium ">
                Billing Details
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex-between mb-20 mt-10 w-full flex-col items-start xl:flex-row">
                    <div className="flex w-full flex-col xl:w-2/5 ">
                        {billingDetails?.map((input, index) => (
                            <label
                                key={index}
                                htmlFor={input.id}
                                className="checkLabel"
                            >
                                {input.label}
                                <input
                                    type={input.type}
                                    {...register(input.id)}
                                    className="input mt-2"
                                />

                                {errors?.[input.id]?.message && (
                                    <p className="errorMessage mb-3 mt-2">
                                        <span className="text-xl">
                                            <FaCircleInfo />
                                        </span>
                                        {errors?.[input.id]?.message}
                                    </p>
                                )}
                            </label>
                        ))}
                    </div>
                    <div className="padding-y flex w-full flex-col xl:w-1/2 xl:py-0 xl:pb-24">
                        <h1 className="flex-center mb-10 justify-start text-xl  font-medium xl:-mt-10 xl:ml-auto">
                            <FaCartShopping />
                            Cart
                        </h1>

                        {cartItems?.map((product, index) => {
                            let show;
                            showItem
                                ? (show = true)
                                : index >= 5
                                ? (show = false)
                                : (show = true);

                            return (
                                <CheckoutProductCard
                                    {...product}
                                    isShow={show}
                                    key={index}
                                />
                            );
                        })}

                        {cartItems?.length > 5 && (
                            <button
                                type="button"
                                onClick={() => setShowItem(!showItem)}
                                className="button my-5 w-1/2 rounded-md"
                            >
                                {!showItem
                                    ? "Show More"
                                    : showVal > 1
                                    ? "Hide Products"
                                    : "Hide Product"}{" "}
                                ({showVal})
                            </button>
                        )}

                        <p className="flex-between mb-4 mt-10 border-b border-black/30 pb-4">
                            Subtotal:{" "}
                            <span>{formatNumber.format(totalAmount)}</span>
                        </p>
                        <p className="flex-between mb-4 border-b border-black/30 pb-4">
                            Shipping: <span>Free</span>
                        </p>
                        <p className="flex-between mb-4 pb-4">
                            Total:{" "}
                            <span>{formatNumber.format(totalAmount)}</span>
                        </p>
                        <div className="flex gap-5">
                            <div>
                                <label htmlFor="bank" className="flex gap-2">
                                    <input
                                        type="radio"
                                        value="bank"
                                        {...register("payment", {
                                            required: true,
                                        })}
                                        id="bank"
                                    />
                                    Bank
                                </label>

                                <br />
                                <label htmlFor="cod" className="flex gap-2">
                                    <input
                                        type="radio"
                                        value="cod"
                                        {...register("payment", {
                                            required: true,
                                        })}
                                        id="cod"
                                    />
                                    Cash on Delivery
                                </label>

                                {errors?.payment?.message && (
                                    <p className="errorMessage mb-2 mt-5 ">
                                        <span className="text-xl">
                                            <FaCircleInfo />
                                        </span>
                                        {errors?.payment?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex-center -mt-1 ml-auto h-10">
                                <img
                                    src={visa}
                                    alt="visa"
                                    className="h-5 w-14"
                                />
                                <img
                                    src={masterCard}
                                    alt="master card"
                                    className="h-8 w-14"
                                />
                            </div>
                        </div>
                        <div className="flex-center mt-10">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="input w-3/5"
                            />
                            <button type="button" className="button w-2/5">
                                Apply Coupon
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="button mx-0 mt-10 xl:w-2/5"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
