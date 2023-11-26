import { ProductCard } from "./index";
import { v4 as uuid } from "uuid";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";

const ProductList = ({ dataId, category, title, timer }) => {
    const { setCategory } = useContext(ShopContext);
    const ref = useRef();

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["category", dataId],
        queryFn: async () => {
            //get products by category id
            const response = await axios.get(`/api/categories/${dataId}`);

            // console.log(response);
            return response.data?.data?.products;
        },
    });

    // console.log(data);

    if (isError) return <span>Error: {error.message}</span>;

    return (
        <div className="padding border-bottom mt-10 flex w-full flex-col gap-8 lg:mt-0 ">
            <div
                className=" flex-center h-10 w-full !justify-start font-semibold  text-tertiary-100 
			"
            >
                <span className="h-10 w-5 rounded-sm bg-tertiary-100"></span>
                {category}
            </div>

            <div className="flex-center w-full flex-col items-start gap-2 ">
                {timer && (
                    <Timer days={3} hours={12} minutes={30} seconds={15} />
                )}

                <div className={`${timer && "mt-5"} flex-between w-full `}>
                    <span
                        className={`font-inter text-2xl font-semibold sm:text-3xl lg:text-4xl`}
                    >
                        {title}
                    </span>

                    {data?.length > 4 ? (
                        <span className="flex-center ">
                            <button
                                type="button"
                                onClick={() => {
                                    ref.current.scrollLeft -= 200;
                                }}
                                className="icon grid-center"
                            >
                                <FaArrowLeft />
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    ref.current.scrollLeft += 200;
                                }}
                                className="icon grid-center"
                            >
                                <FaArrowRight />
                            </button>
                        </span>
                    ) : null}
                </div>
            </div>
            <div
                ref={ref}
                className={`${
                    isLoading ? "h-auto" : "min-h-[450px]"
                }  snap-x  overflow-x-hidden  overflow-y-hidden py-10`}
            >
                <div className="flex whitespace-nowrap ">
                    {isLoading ? (
                        <span className="mx-auto inline-block bg-blue-400">
                            Loading...
                        </span>
                    ) : (
                        data.map((product) => {
                            // console.log(product);
                            return (
                                <span key={uuid()} className="inline-block">
                                    <ProductCard {...product} />
                                </span>
                            );
                        })
                    )}
                </div>
            </div>

            {isLoading ? null : (
                <Link
                    to={"/products"}
                    className="button xl:px-20 "
                    onClick={() => {
                        setCategory(title);
                    }}
                >
                    View All Products
                </Link>
            )}
        </div>
    );
};

export default ProductList;
