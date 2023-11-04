import React, { useState } from "react";
import { Breadcrumb } from "../components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCircleInfo } from "react-icons/fa6";

const formSchema = new yup.ObjectSchema({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
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
    const {
        register,
        trigger,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });

    const [active, setActive] = useState("");

    const handleSubmit = (e) => {
        const isValid = trigger();
        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();
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
                                className="accountBtnSection"
                                onClick={() => setActive("account")}
                            >
                                Manage My Account
                            </button>
                        </li>
                        <li>
                            <button
                                className="accountBtnSection"
                                onClick={() => setActive("order")}
                            >
                                My Orders
                            </button>
                        </li>
                        <li>
                            <button
                                className="accountBtnSection"
                                onClick={() => setActive("logout")}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col px-8 py-10 shadow-md xl:w-9/12">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-2 gap-5"
                    >
                        <h1 className="col-span-2 mb-10 text-xl font-medium">
                            Edit Your Profile
                        </h1>

                        <div>
                            <label
                                htmlFor="firstname"
                                className="mb-3 inline-block "
                            >
                                Firstname:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Your Firstname"
                                {...register("firstname")}
                            />
                            {errors?.firstname?.message && (
                                <p className="errorMessage mb-1">
                                    <span className="text-xl">
                                        <FaCircleInfo />
                                    </span>
                                    {errors.firstname?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="lastname"
                                className="mb-3 inline-block "
                            >
                                Lastname:
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Your Lastname"
                                {...register("lastname")}
                            />
                            {errors?.lastname?.message && (
                                <p className="errorMessage mb-1">
                                    <span className="text-xl">
                                        <FaCircleInfo />
                                    </span>
                                    {errors.lastname?.message}
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

                        <div>
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
                            <button type="button" className="button m-0">
                                Cancel
                            </button>
                            <button type="submit" className="button m-0">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Account;
