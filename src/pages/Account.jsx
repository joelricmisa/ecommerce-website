import React, { useState, useEffect } from "react";
import { Breadcrumb } from "../components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCog, FaEdit, FaRegListAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

    const {
        register,
        trigger,
        formState: { errors },
        getValues,
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const [active, setActive] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const getCurrentUser = async () => {
            const response = await axiosPrivate.get("/api/users/current", {
                signal: controller.signal,
            });

            setValue("name", response.data?.data?.name);
            setValue("email", response.data?.data?.email);
            setValue("address", response.data?.data?.address);
            setId(response.data?.data?._id);
            console.log(response.data);
        };

        getCurrentUser();
    }, [auth, edit]);

    const handleEditInfo = async (e) => {
        const isValid = trigger();
        const { name, email, address } = getValues();
        console.log("trigger edit btn");
        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();

            try {
                const response = await axiosPrivate.put(
                    `/api/users/${id}`,
                    JSON.stringify({ name, email, address }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);
                console.log(response);
                setEdit(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleChangePass = async (e) => {
        const isValid = trigger();
        const { currentPassword, newPassword } = getValues();
        console.log("trigger change pass btn");
        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();

            try {
                const response = await axiosPrivate.post(
                    `/api/change-password`,
                    JSON.stringify({ currentPassword, newPassword }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                console.log(response?.data);
                console.log(response);
                reset({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setEditPass(false);
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <section className="padding-x animate w-full">
            <Breadcrumb />
            <div className="padding-b flex flex-col gap-10 xl:flex-row">
                <div className=" px-8 py-10 text-sm shadow-md xl:w-3/12">
                    <ul>
                        <li>
                            <button
                                className="accountBtnSection text-secondary"
                                onClick={() => setActive("account")}
                            >
                                <FaCog /> Manage My Account
                            </button>
                        </li>
                        {/* <li>
                            <button
                                className="accountBtnSection"
                                onClick={() => setActive("order")}
                            >
                                <FaRegListAlt /> My Orders
                            </button>
                        </li>
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
                                    Save Changes
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
                            <label
                                htmlFor="pass"
                                className="mt-5 inline-block "
                            >
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
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Account;
