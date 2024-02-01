import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components";
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
import { useQuery } from "@tanstack/react-query";

import { ratingImages } from "../constants";
import { computePrice, formatPrice } from "../utils";
import { useCategory, useWishlist } from "../hooks";

const ProductPreview = () => {
    const location = useLocation();
    const { id } = useParams();

    const { cartItems, addToCart, removeCartItem } = useContext(ShopContext);

    const { addToWishlist, removeWishlistItem, wishlistItems } = useWishlist();

    const { setCategory } = useCategory();

    const [quantity, setQuantity] = useState(1);
    const [activeWishlist, setActiveWishlist] = useState(false);
    const [inCart, setInCart] = useState(false);
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const { data: currentProduct } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axios.get(`/api/products/${id}`);
            const responseData = response?.data?.data;
            return responseData;
        },
    });

    const crumbsList = [
        { label: "Home", path: "/", setCateg: "all" },
        { label: "Products", path: "/products", setCateg: "all" },
        {
            label: currentProduct ? currentProduct?.categories?.[0]?.name : "",
            path: "/products",
            setCateg: currentProduct
                ? currentProduct?.categories?.[0]?.name
                : "",
        },
        {
            label: currentProduct ? currentProduct?.name : "",
            path: location.pathname,
            setCateg: "all",
        },
    ];

    const ratingImg = ratingImages[currentProduct?.rating];

    useEffect(() => {
        const filterWishlist = wishlistItems?.filter(
            (item) => item?._id === id,
        );
        const filterCart = cartItems?.filter(
            (item) => item?.product_id._id === id,
        );

        filterWishlist?.length === 0
            ? setActiveWishlist(false)
            : setActiveWishlist(true);
        filterCart?.length === 0 ? setInCart(false) : setInCart(true);
    }, [wishlistItems, cartItems, id]);

    const relatedProducts = useQuery({
        queryKey: ["category", currentProduct?.categories?.[0]._id],
        queryFn: async () => {
            const response = await axios.get(
                `/api/categories/${currentProduct?.categories?.[0]._id}`,
            );
            const responseData = response?.data?.data?.products;
            return responseData;
        },
        enabled: !!currentProduct?.categories?.[0]._id,
    });

    const handleAddToCart = () => {
        const itemQty = localStorage.getItem("productQty");

        const productsQty = itemQty ? JSON.parse(itemQty) : [];

        const productIndex = productsQty.findIndex((item) => {
            return item._id === id;
        });

        const finalPrice = computePrice(
            currentProduct?.price,
            currentProduct?.discount,
        );

        if (productIndex !== -1) {
            productsQty.splice(productIndex, 1, {
                _id: id,
                quantity: quantity,
            });
        } else {
            productsQty.push({
                _id: id,
                quantity: quantity,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));
        return addToCart({
            product_id: { ...currentProduct },
            quantity: quantity,
            price: finalPrice,
        });
    };

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
                            currentProduct?.image
                                ?.replace("public", "")
                                ?.replaceAll("\\", "/")
                        }
                        alt=""
                        className="scale-100 xl:scale-150"
                    />
                </div>

                <div className="flex-center w-full flex-col items-start gap-3 xl:w-1/2">
                    <h1 className="text-2xl font-semibold">
                        {currentProduct?.name}
                    </h1>

                    <span className="flex-center justify-start text-black/60 ">
                        <img src={ratingImg} alt="" />
                        <p>({currentProduct?.rate_count} Reviews)</p>
                    </span>
                    <div className="flex text-2xl">
                        {currentProduct?.discount > 0 && (
                            <span className="text-black/50 line-through">
                                ₱{currentProduct?.price}
                            </span>
                        )}
                        <span
                            className={`${
                                currentProduct?.discount > 0 ? "ml-3" : ""
                            } text-tertiary-100`}
                        >
                            {currentProduct?.discount > 0
                                ? formatPrice(
                                      computePrice(
                                          currentProduct?.price,
                                          currentProduct?.discount,
                                      ),
                                  )
                                : formatPrice(currentProduct?.price)}
                        </span>
                        {currentProduct?.discount > 0 && (
                            <span className="ml-3 flex h-8 items-center gap-2 rounded-md bg-tertiary-100 p-1 text-lg text-white">
                                -{currentProduct?.discount}%
                                <FaTag />
                            </span>
                        )}
                    </div>

                    <p className="mt-2 border-b border-black/10 pb-5 text-sm leading-7">
                        {currentProduct?.description}
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
                                max={100}
                                value={`${
                                    quantity < 10 ? `0${quantity}` : quantity
                                }`}
                                className="input mx-0 py-2 text-center"
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
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
                                    ? removeCartItem({
                                          _id: id,
                                          name: currentProduct?.name,
                                      })
                                    : handleAddToCart()
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
                                    ? removeWishlistItem({
                                          _id: id,
                                          name: currentProduct?.name,
                                      })
                                    : addToWishlist({ ...currentProduct })
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
                            ?.filter((item) => item._id !== currentProduct?._id)
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
