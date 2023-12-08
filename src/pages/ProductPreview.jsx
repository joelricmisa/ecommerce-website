import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components";
import { shopProductsData } from "../constants";
import { useLocation, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import {
    FaCartPlus,
    FaHeart,
    FaInbox,
    FaRegHeart,
    FaRotate,
    FaTag,
    FaTruckFast,
    FaXmark,
} from "react-icons/fa6";
import axios from "../api/axios";
import { fiveStar, fourHalfStar, fourStar, threeStar } from "../assets/images";
import { useQuery } from "@tanstack/react-query";

const ProductPreview = () => {
    const location = useLocation();
    const { id } = useParams();

    const {
        cartItems,
        addToCart,
        removeCartItem,
        addToWishlist,
        removeWishlistItem,
        wishlistItems,
        setCategory,
    } = useContext(ShopContext);

    const [quantity, setQuantity] = useState(1);
    const [activeWishlist, setActiveWishlist] = useState(false);
    const [inCart, setInCart] = useState(false);
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    const currentProduct = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axios.get(`/api/products/${id}`);
            console.log(response);
            return response?.data?.data;
        },
    });

    const crumbsList = [
        { label: "Home", path: "/", setCateg: "all" },
        { label: "Products", path: "/products", setCateg: "all" },
        {
            label: currentProduct
                ? currentProduct?.data?.categories?.[0]?.name
                : "",
            path: "/products",
            setCateg: currentProduct
                ? currentProduct?.data?.categories?.[0]?.name
                : "",
        },
        {
            label: currentProduct ? currentProduct?.data?.name : "",
            path: location.pathname,
            setCateg: "all",
        },
    ];

    let ratingImg;

    switch (currentProduct?.data?.rating) {
        case "3":
            ratingImg = threeStar;
            console.log(ratingImg);
            break;
        case "4":
            ratingImg = fourStar;
            console.log(ratingImg);
            break;
        case "4.5":
            ratingImg = fourHalfStar;
            console.log(ratingImg);
            break;
        case "5":
            ratingImg = fiveStar;
            console.log(ratingImg);
            break;
    }

    useEffect(() => {
        const filterWishlist = wishlistItems?.filter(
            (item) => item?._id === id,
        );
        const filterCart = cartItems?.filter((item) => item?._id === id);
        filterWishlist?.length === 0
            ? setActiveWishlist(false)
            : setActiveWishlist(true);
        filterCart?.length === 0 ? setInCart(false) : setInCart(true);
    }, [wishlistItems, cartItems, id]);

    const relatedProducts = useQuery({
        queryKey: ["category", currentProduct?.data?.categories?.[0]._id],
        queryFn: async () => {
            const response = await axios.get(
                `/api/categories/${currentProduct?.data?.categories?.[0]._id}`,
            );
            console.log(response);
            return response?.data?.data?.products;
        },
    });

    return (
        <section className="padding animate">
            <p>
                {crumbsList.map((link, index) => {
                    return (
                        <Link
                            to={link.path}
                            className="capitalize  opacity-50 after:mx-2 after:content-['/'] last:opacity-100 after:last:content-['']"
                            key={index}
                            onClick={() => setCategory(link.setCateg)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </p>
            <div className="flex-center my-10 flex-col items-start gap-10 xl:flex-row ">
                <div className=" grid-center w-full bg-extraColor py-14   xl:min-h-[400px] xl:w-1/2">
                    <img
                        src={
                            baseUrl +
                            currentProduct?.data?.image
                                ?.replace("public", "")
                                ?.replaceAll("\\", "/")
                        }
                        alt=""
                        className="scale-100 xl:scale-150"
                    />
                </div>

                <div className="flex-center w-full flex-col items-start gap-3 xl:w-1/2">
                    <h1 className="text-2xl font-semibold">
                        {currentProduct?.data?.name}
                    </h1>

                    <span className="flex-center justify-start text-black/60 ">
                        <img src={ratingImg} alt="" />
                        <p>({currentProduct?.data?.rate_count} Reviews)</p>
                    </span>
                    <div className="flex text-2xl">
                        {currentProduct?.data?.discount > 0 ? (
                            <span className="text-black/50 line-through">
                                ₱{currentProduct?.data?.price}
                            </span>
                        ) : null}
                        <span
                            className={`${
                                currentProduct?.data?.discount > 0 ? "ml-3" : ""
                            } text-tertiary-100`}
                        >
                            {currentProduct?.data?.discount > 0
                                ? formatNumber.format(
                                      Number(currentProduct?.data?.price) -
                                          Number(currentProduct?.data?.price) *
                                              (currentProduct?.data?.discount /
                                                  100),
                                  )
                                : formatNumber.format(
                                      currentProduct?.data?.price,
                                  )}
                        </span>
                        {currentProduct?.data?.discount > 0 ? (
                            <span className="ml-3 flex h-8 items-center gap-2 rounded-md bg-tertiary-100 p-1 text-lg text-white">
                                -{currentProduct?.data?.discount}%
                                <FaTag />
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 border-b border-black/10 pb-5 text-sm leading-7">
                        {currentProduct?.data?.description}
                    </p>

                    <div className="flex-center my-3 w-full flex-col xl:flex-row">
                        <div className="flex-center w-full gap-0 xl:w-1/4">
                            <button
                                type="button"
                                className="button mx-0 w-1/4 p-2 xl:w-auto"
                                onClick={() =>
                                    quantity === 1
                                        ? setQuantity(1)
                                        : setQuantity(quantity - 1)
                                }
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={`${
                                    quantity < 10 ? `0${quantity}` : quantity
                                }`}
                                className="input mx-0 py-2 text-center"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button
                                type="button"
                                className="button mx-0 w-1/4 p-2 xl:w-auto"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="button flex-center w-full py-2 xl:w-1/2"
                            onClick={() =>
                                inCart
                                    ? removeCartItem({ _id: id })
                                    : addToCart({
                                          ...currentProduct?.data,
                                          quantity: quantity,
                                      })
                            }
                        >
                            {inCart ? <FaXmark /> : <FaCartPlus />}
                            {inCart ? "Remove in Cart " : "Add To Cart"}
                        </button>

                        <span
                            className={`icon scale-125 rounded-md border border-black/10 xl:scale-100 ${
                                activeWishlist
                                    ? "text-tertiary-100"
                                    : "hover:text-tertiary-100"
                            } `}
                            onClick={() =>
                                activeWishlist
                                    ? removeWishlistItem({ _id: id })
                                    : addToWishlist({ ...currentProduct?.data })
                            }
                        >
                            {activeWishlist ? (
                                <FaHeart className="text-xl" />
                            ) : (
                                <FaRegHeart className="text-xl" />
                            )}
                        </span>
                    </div>
                    <div className="my-3 flex w-full flex-col text-sm">
                        <p className="flex-center border-black/ justify-start border p-3 ">
                            <FaTruckFast className="text-3xl" />
                            <span>
                                Free delivery <br />
                                Enter your postal code for Delivery Availability
                            </span>
                        </p>
                        <p className="flex-center border-black/ justify-start border p-3 ">
                            <FaRotate className="text-3xl" />
                            <span>
                                Return Delivery <br />
                                Free 30 Days Delivery Returns. Details
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="padding-y flex w-full flex-col gap-10">
                <div className="flex-center h-10 justify-start font-semibold text-tertiary-100 ">
                    <span className="h-10 w-5 rounded-sm bg-tertiary-100 "></span>

                    {relatedProducts.data?.length > 1
                        ? "Related Items"
                        : "Related Item"}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
                    {relatedProducts.data?.length !== 0 ? (
                        relatedProducts.data
                            ?.filter(
                                (item) =>
                                    item._id !== currentProduct?.data?._id,
                            )
                            .map((product, index) => {
                                return <ProductCard key={index} {...product} />;
                            })
                    ) : (
                        <span className="flex-center col-span-12 py-10 text-xl">
                            <FaInbox className="text-3xl" /> No results found
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductPreview;
