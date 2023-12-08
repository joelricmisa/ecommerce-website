import { useContext, useRef, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard, Timer } from "./index";
import { ProductCard } from "./index";
import { ShopContext } from "../contexts/ShopContext";
import axios from "../api/axios";

const ProductList = ({ dataId, category, title, timer }) => {
    const dummyArr = [1, 2, 3, 4];
    const ref = useRef();

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["category", dataId],
        queryFn: async () => {
            const response = await axios.get(`/api/categories/${dataId}`);

            return response.data?.data?.products;
        },
    });

    //Product List Components

    const SubjectBox = () => (
        <div
            className=" flex-center h-10 w-full !justify-start font-semibold  text-tertiary-100 
			"
        >
            <span className="h-10 w-5 rounded-sm bg-tertiary-100"></span>
            {category}
        </div>
    );

    const TimerBox = () => {
        return timer && <Timer />;
    };

    const CategoryTitle = () => (
        <span
            className={`font-inter text-2xl font-semibold sm:text-3xl lg:text-4xl`}
        >
            {title}
        </span>
    );

    const SliderBtns = () => {
        return data?.length > 4 ? (
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
        ) : null;
    };

    const ContentProducts = () => {
        return isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
                {dummyArr.map((val, index) => {
                    return (
                        <span key={index} className="inline-block">
                            <SkeletonCard />
                        </span>
                    );
                })}
            </div>
        ) : (
            <div className="flex whitespace-nowrap ">
                {data.map((product, index) => (
                    <span key={index} className="inline-block">
                        <ProductCard {...product} />
                    </span>
                ))}
            </div>
        );
    };

    const ViewAllBtn = () => {
        const { setCategory } = useContext(ShopContext);

        return isLoading ? null : data?.length > 4 ? (
            <Link
                to={"/products"}
                className="button xl:px-20 "
                onClick={() => {
                    setCategory(title);
                }}
            >
                View All Products
            </Link>
        ) : null;
    };

    return (
        <div className="padding border-bottom mt-10 flex w-full flex-col gap-8 lg:mt-0 ">
            <SubjectBox />

            <div className="flex-center w-full flex-col items-start gap-2 ">
                <TimerBox />

                <div className={`${timer && "mt-5"} flex-between w-full `}>
                    <CategoryTitle />
                    <SliderBtns />
                </div>
            </div>

            <div
                ref={ref}
                className={`${
                    isLoading ? "h-auto" : "min-h-[450px]"
                }  snap-x  overflow-x-hidden  overflow-y-hidden py-10`}
            >
                <ContentProducts />
            </div>

            <ViewAllBtn />
        </div>
    );
};

export default memo(ProductList);
