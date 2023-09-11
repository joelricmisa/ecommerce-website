import { useEffect, useState } from "react";

import { SvgIcon } from "./index";
import { heart, eye, cart, xMark } from "../assets/icons/SvgIconsList";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductCard = ({
    id,
    productName,
    productImage,
    currentPrice,
    originalPrice,
    rating,
    rateCount,
    discountPercentage,
    quantity,
    subTotal,
}) => {
    const {
        addToCart,
        cartItems,
        removeToCart,
        addToWishlist,
        removeToWishlist,
        wishlistItems,
    } = useContext(ShopContext);
    const [activeWishlist, setActiveWishlist] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const filterWishlist = wishlistItems.filter((item) => item.id === id);
        const filterCart = cartItems.filter((item) => item.id === id);
        filterWishlist.length === 0
            ? setActiveWishlist(false)
            : setActiveWishlist(true);
        filterCart.length === 0 ? setInCart(false) : setInCart(true);
    }, [wishlistItems, cartItems]);

    return (
        <div
            className=" relative mr-4 flex min-h-[300px] w-[170px] snap-start flex-col overflow-hidden rounded-sm  transition-transform hover:scale-105  hover:shadow-sm hover:ring-1 hover:ring-black/10  hover:ring-offset-2 md:w-[200px] lg:mx-5 lg:w-[300px]"
            onMouseOver={() => setToggle(true)}
            onMouseOut={() => setToggle(false)}
        >
            <div className="grid-center relative h-[270px] w-full  bg-extraColor">
                {discountPercentage && (
                    <span className="grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary">
                        {discountPercentage}
                    </span>
                )}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <span
                        className={`icon grid-center ${
                            activeWishlist
                                ? "text-tertiary-100"
                                : "hover:text-tertiary-100"
                        } `}
                        onClick={() =>
                            activeWishlist
                                ? removeToWishlist({ id })
                                : addToWishlist({
                                      id,
                                      productName,
                                      productImage,
                                      currentPrice,
                                      originalPrice,
                                      rating,
                                      rateCount,
                                      discountPercentage,
                                      quantity,
                                      subTotal,
                                  })
                        }
                    >
                        <SvgIcon
                            icon={heart(
                                ` ${
                                    activeWishlist
                                        ? "fill-tertiary-100"
                                        : "text-tertiary-200 fill-none hover:fill-tertiary-100"
                                }`,
                            )}
                        />
                    </span>

                    <Link to={`/products/${id}`} className="icon grid-center ">
                        <SvgIcon icon={eye("text-white fill-tertiary-200 ")} />
                    </Link>
                </div>
                <img
                    src={productImage}
                    className="scale-75  xl:scale-95"
                    alt=""
                />
                {toggle && (
                    <button
                        type="button"
                        className="button flex-center absolute inset-x-0 bottom-0 gap-2 bg-secondary px-0 py-2"
                        onClick={() =>
                            inCart
                                ? removeToCart({ id })
                                : addToCart({
                                      id,
                                      productName,
                                      productImage,
                                      currentPrice,
                                      originalPrice,
                                      rating,
                                      rateCount,
                                      discountPercentage,
                                      quantity,
                                      subTotal,
                                  })
                        }
                    >
                        {inCart ? (
                            <SvgIcon icon={xMark("w-6 h-6")} />
                        ) : (
                            <SvgIcon icon={cart("w-6 h-6")} />
                        )}
                        {inCart ? "Remove " : "Add To Cart"}
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 p-2">
                <h1 className="text-wrap whitespace-pre-wrap">{productName}</h1>
                <p className="text-secondary-100 font-medium">
                    {currentPrice}
                    <span className="ml-3 text-black/50 line-through">
                        {originalPrice}
                    </span>
                </p>
                <div className="flex-center justify-start gap-1 ">
                    <img
                        src={rating}
                        alt=""
                        className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                    />{" "}
                    <span className="text-black/50">({rateCount})</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
