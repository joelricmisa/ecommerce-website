import React, { useState, useEffect } from "react";
import { Breadcrumb } from "../components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCog, FaEdit, FaRegListAlt, FaSpinner } from "react-icons/fa";
import { format } from "date-fns";

import {
    useAuth,
    useAxiosPrivate,
    useGetImage,
    useNumberFormat,
    useFeedback,
    useErrorFeedback,
} from "../hooks";

const formSchema = new yup.ObjectSchema({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    currentPassword: yup
        .string()
        .required("current password is a required field"),
    newPassword: yup.string().min(4, "password must be at least 4 characters"),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("newPassword")],
            "it must match with your new password",
        ),
});

const Account = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [edit, setEdit] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    const showFeedback = useFeedback();
    const showError = useErrorFeedback();

    const {
        register,
        trigger,
        formState: { errors },
        getValues,
        setValue,
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const [active, setActive] = useState("account");

    const getCurrentUser = async () => {
        await axiosPrivate.get("/api/users/current").then((response) => {
            setValue("name", response.data.data?.name);
            setValue("email", response.data.data?.email);
            setValue("address", response.data.data?.address);
            setId(response.data.data?._id);
            return response.data.data;
        });
    };

    const getUserOrder = async () => {
        await axiosPrivate.get(`/api/orders/user/${id}`).then((response) => {
            setOrders([...response.data].reverse());
            return response.data;
        });
    };

    const numberFormatter = useNumberFormat();

    useEffect(() => {
        getCurrentUser();
    }, [auth, edit]);

    useEffect(() => {
        getUserOrder();
    }, [id]);

    const handleEditInfo = async (e) => {
        const isValid = trigger();
        const { name, email, address } = getValues();
        //console.log("trigger edit btn");
        setIsLoading(true);

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            try {
                const response = await axiosPrivate.put(
                    `/api/users/${id}`,
                    JSON.stringify({ name, email, address }),
                );

                // console.log(response?.data);
                // console.log(response);

                setIsLoading(false);

                showFeedback(
                    "success",
                    `Your profile information has been successfully updated!`,
                    "alert",
                );

                setEdit(false);
            } catch (err) {
                setIsLoading(false);

                showError(err.code);

                // console.log(err);
            }
        }
    };

    const handleChangePass = async (e) => {
        const isValid = trigger();
        const { currentPassword, newPassword } = getValues();
        //console.log("trigger change pass btn");
        setIsLoading(true);

        if (!isValid) {
            e.preventDefault();
            setIsLoading(false);
        } else {
            e.preventDefault();

            try {
                const response = await axiosPrivate.post(
                    `/api/change-password`,
                    JSON.stringify({ currentPassword, newPassword }),
                );

                // console.log(response?.data);
                // console.log(response);
                reset({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                setIsLoading(false);

                showFeedback(
                    "success",
                    `Your password has been successfully updated!`,
                    "alert",
                );

                setEditPass(false);
            } catch (err) {
                setIsLoading(false);

                //error when the current password is invalid
                setError("currentPassword", {
                    type: "custom",
                    message: err.response.data.message,
                });

                showError(err.code);
                // console.log(err);
            }
        }
    };

    const AccountSection = () => {
        return (
            <>
                {!edit ? (
                    <form className="grid grid-cols-2 gap-5">
                        <h1 className=" mb-10 text-xl font-medium">
                            Account Info
                        </h1>

                        <button
                            type="button"
                            className="button m-0 ml-auto flex h-12 items-center gap-2 "
                            onClick={() => setEdit(true)}
                        >
                            Edit <FaEdit className="text-lg" />
                        </button>

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-3 inline-block "
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Click edit to add your name"
                                value={getValues("name")}
                                {...register("name")}
                                readOnly
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-3 inline-block "
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                className="input"
                                placeholder="Click edit to add your email"
                                {...register("email")}
                                readOnly
                            />
                        </div>

                        <div className="col-span-2">
                            <label
                                htmlFor="address"
                                className="mb-3 inline-block "
                            >
                                Address:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Click edit to add your address"
                                {...register("address")}
                                readOnly
                            />
                        </div>
                    </form>
                ) : (
                    <form
                        onSubmit={handleEditInfo}
                        className="grid grid-cols-2 gap-5"
                    >
                        <h1 className="col-span-2 mb-10 text-xl font-medium">
                            Edit Your Profile
                        </h1>

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-3 inline-block "
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Your Name"
                                {...register("name")}
                            />
                            {errors?.name?.message && (
                                <p className="errorMessage mb-1">
                                    <span className="text-xl">
                                        <FaCircleInfo />
                                    </span>
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-3 inline-block "
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                className="input"
                                placeholder="Your Email"
                                {...register("email")}
                            />

                            {errors?.email?.message && (
                                <p className="errorMessage mb-1">
                                    <span className="text-xl">
                                        <FaCircleInfo />
                                    </span>
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label
                                htmlFor="address"
                                className="mb-3 inline-block "
                            >
                                Address:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Your Address"
                                {...register("address")}
                            />

                            {errors?.address?.message && (
                                <p className="errorMessage mb-1">
                                    <span className="text-xl">
                                        <FaCircleInfo />
                                    </span>
                                    {errors.address?.message}
                                </p>
                            )}
                        </div>

                        <div className="col-span-2 mt-5 flex justify-end gap-5 ">
                            <button
                                type="button"
                                className="button m-0"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="button m-0">
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <FaSpinner className="animate-spin" />
                                        Updating...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                )}
                {!editPass ? (
                    <button
                        type="button"
                        className="button col-span-2 m-0 ml-auto mt-10"
                        onClick={() => setEditPass(true)}
                    >
                        Change Password
                    </button>
                ) : (
                    <form
                        className="grid grid-cols-2 gap-5"
                        onSubmit={handleChangePass}
                    >
                        <label htmlFor="pass" className="mt-5 inline-block ">
                            Password Changes:
                        </label>

                        <input
                            type="password"
                            className="input col-span-2"
                            placeholder="Current Password"
                            {...register("currentPassword")}
                        />
                        {errors?.currentPassword?.message && (
                            <p className="errorMessage -mt-1 mb-1">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.currentPassword?.message}
                            </p>
                        )}
                        <input
                            type="password"
                            className="input col-span-2"
                            placeholder="New Password"
                            {...register("newPassword")}
                        />

                        {errors?.newPassword?.message && (
                            <p className="errorMessage -mt-1 mb-1">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.newPassword?.message}
                            </p>
                        )}

                        <input
                            type="password"
                            className="input col-span-2"
                            placeholder="Confirm New Password"
                            {...register("confirmPassword")}
                        />

                        {errors?.confirmPassword?.message && (
                            <p className="errorMessage -mt-1 mb-1">
                                <span className="text-xl">
                                    <FaCircleInfo />
                                </span>
                                {errors.confirmPassword?.message}
                            </p>
                        )}
                        <div className="col-span-2 mt-5 flex justify-end gap-5 ">
                            <button
                                type="button"
                                className="button m-0"
                                onClick={() => setEditPass(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="button m-0">
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <FaSpinner className="animate-spin" />
                                        Updating...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                )}{" "}
            </>
        );
    };
    const OrderSection = () => {
        return (
            <div>
                <h1 className="text-xl font-medium">My Orders</h1>
                <div className="overflow-y-auto py-5">
                    {orders?.map((order) => (
                        <div className="my-4 border-b-[1px] py-4">
                            <button
                                className="float-right text-sm"
                                onClick={() => {
                                    setOrderDetails({ ...order });
                                    setActive("viewOrder");
                                }}
                            >
                                View Order
                            </button>
                            <h2 className="font-medium text-gray-950">
                                Order Id: {order?._id}
                            </h2>
                            <p className="text-gray my-2 text-gray-900">
                                Status:{"  "}
                                {order?.status}
                            </p>
                            <p className="text-gray my-2 text-gray-900">
                                Total:{"  "}
                                {numberFormatter.format(order?.total_price)}
                            </p>
                            <p className="text-gray my-2 text-gray-900">
                                Ordered On:{"  "}
                                {format(order?.order_date, "MM/dd/yyyy")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ViewOrderSection = () => {
        return (
            <div className="text-gray-900">
                <h1 className="font-medium">Order ID: {orderDetails._id}</h1>
                <div className="my-4 flex flex-col gap-2 border-y-2 py-4 text-sm">
                    <p>Status: {orderDetails.status}</p>
                    <p>
                        Ordered On:{" "}
                        {format(orderDetails.order_date, "MM/dd/yyyy")}
                    </p>
                    <p className="font-bold">
                        Total Amount to Pay:{" "}
                        {numberFormatter.format(orderDetails.total_price)}
                    </p>
                </div>
                <div className="overflow-y-auto">
                    <h1 className="mb-2 text-sm">
                        {orderDetails?.products?.length > 1
                            ? `Number of products: ${orderDetails?.products?.length}`
                            : `Number of product: ${orderDetails?.products?.length}`}
                    </h1>
                    <h1 className="text-sm">
                        {orderDetails?.products?.length > 1
                            ? `Product Details:`
                            : `Product Detail:`}
                    </h1>
                    {orderDetails?.products?.map((product) => {
                        const imageSource = useGetImage(
                            product?.product_id?.image,
                        );

                        return (
                            <div className="my-4 flex items-center gap-8 border-b-[1px] py-4 ">
                                <img
                                    src={imageSource}
                                    alt=""
                                    className="h-[100px] w-[120px] object-contain"
                                />
                                <div className="flex flex-col gap-2 text-sm">
                                    <h2 className="mb-2 text-base font-medium">
                                        {product?.product_id?.name}
                                    </h2>
                                    <p>Quantity: {product?.quantity} </p>
                                    <p>
                                        Price:{" "}
                                        {numberFormatter.format(product?.price)}
                                    </p>
                                    <p>
                                        Total Price:{" "}
                                        {numberFormatter.format(
                                            product?.price * product?.quantity,
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <section className="padding-x animate w-full">
            <Breadcrumb />
            <div className="padding-b flex flex-col gap-10 xl:flex-row">
                <div className=" px-8 py-10 text-sm shadow-md xl:w-3/12">
                    <ul>
                        <li>
                            <button
                                className={`accountBtnSection ${
                                    active === "account" && "text-secondary"
                                } `}
                                onClick={() => setActive("account")}
                            >
                                <FaCog /> Manage Account
                            </button>
                        </li>
                        <li>
                            <button
                                className={`accountBtnSection  ${
                                    (active === "order" ||
                                        active === "viewOrder") &&
                                    "text-secondary"
                                }`}
                                onClick={() => setActive("order")}
                            >
                                <FaRegListAlt />
                                My Orders
                            </button>
                        </li>
                        {/*
                        <li>
                            <button
                                className="accountBtnSection"
                                onClick={() => setActive("logout")}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </li> */}
                    </ul>
                </div>
                <div className="flex flex-col px-8 py-10 shadow-md xl:w-9/12">
                    {active === "account" && <AccountSection />}
                    {active === "order" && <OrderSection />}
                    {active === "viewOrder" && <ViewOrderSection />}
                </div>
            </div>
        </section>
    );
};

export default Account;
