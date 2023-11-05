import { ProductCard } from "./index";
import { timerImg } from "../assets/images";
import { v4 as uuid } from "uuid";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const ProductList = ({ data, category, title, timer }) => {
    const { setCategory } = useContext(ShopContext);
    const [rotate, setRotate] = useState(0);
    const ref = useRef();
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
                        {title}{" "}
                    </span>

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
                </div>
            </div>
            <div
                ref={ref}
                className=" min-h-[450px] snap-x  overflow-x-hidden  overflow-y-hidden py-10"
            >
                <div className=" flex   whitespace-nowrap">
                    {data.map((product) => {
                        // console.log(product);
                        return (
                            <span key={uuid()} className="inline-block">
                                <ProductCard
                                    id={product.id}
                                    productName={product.productName}
                                    productImage={product.productImage}
                                    currentPrice={product.currentPrice}
                                    originalPrice={product.originalPrice}
                                    rating={product.rating}
                                    rateCount={product.rateCount}
                                    discountPercentage={
                                        product.discountPercentage
                                    }
                                    quantity={product.quantity}
                                    subTotal={product.subTotal}
                                />
                            </span>
                        );
                    })}
                </div>
            </div>

            <Link
                to={"/products"}
                className="button xl:px-20 "
                onClick={() => {
                    title === "Flash Sales"
                        ? setCategory(title)
                        : setCategory("all");
                }}
            >
                View All Products
            </Link>
        </div>
    );
};

export default ProductList;
