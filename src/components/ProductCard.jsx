import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import {
    FaCartPlus,
    FaHeart,
    FaRegEye,
    FaRegHeart,
    FaXmark,
} from "react-icons/fa6";
import { fiveStar, fourHalfStar, fourStar, threeStar } from "../assets/images";

const ProductCard = (props) => {
    const {
        _id,
        name,
        image,
        price,
        rating,
        discount,
        rate_count,
        controlWidth = true,
    } = props;

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
    const baseUrl = "https://exclusive-backend-te81.onrender.com";
    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    const finalPrice = Number(price) - Number(price) * (discount / 100);

    // console.log(rate_count);
    useEffect(() => {
        const filterWishlist = wishlistItems.filter((item) => item._id === _id);
        const filterCart = cartItems.filter((item) => item._id === _id);
        filterWishlist?.length === 0
            ? setActiveWishlist(false)
            : setActiveWishlist(true);
        filterCart?.length === 0 ? setInCart(false) : setInCart(true);
    }, [wishlistItems, cartItems, _id]);

    let ratingImg;

    switch (rating) {
        case "3":
            ratingImg = threeStar;
            // console.log(ratingImg);
            break;
        case "4":
            ratingImg = fourStar;
            // console.log(ratingImg);
            break;
        case "4.5":
            ratingImg = fourHalfStar;
            // console.log(ratingImg);
            break;
        case "5":
            ratingImg = fiveStar;
            // console.log(ratingImg);
            break;
    }

    return (
        <div
            className={`${
                controlWidth ? "w-[170px] md:w-[200px] lg:w-[300px]" : "w-auto"
            } relative mr-4 flex min-h-[300px]  snap-start flex-col overflow-hidden rounded-sm  transition-transform hover:scale-105  hover:shadow-sm hover:ring-1 hover:ring-black/10  hover:ring-offset-2  lg:mx-5 `}
            onMouseOver={() => setToggle(true)}
            onMouseOut={() => setToggle(false)}
        >
            <div className="grid-center relative h-[270px] w-full  bg-extraColor">
                {discount > 0 && (
                    <span className="grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary">
                        -{discount}%
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
                                ? removeToWishlist({ _id })
                                : addToWishlist({ ...props })
                        }
                    >
                        {activeWishlist ? <FaHeart /> : <FaRegHeart />}
                    </span>

                    <Link to={`/products/${_id}`} className="icon grid-center ">
                        <FaRegEye className="hover:fill-tertiary-100" />
                    </Link>
                </div>
                <img
                    src={
                        baseUrl +
                        image?.replace("public", "")?.replaceAll("\\", "/")
                    }
                    className="scale-75  xl:scale-95"
                    alt=""
                />
                {toggle && (
                    <button
                        type="button"
                        className="button flex-center absolute inset-x-0 bottom-0 gap-2 bg-secondary px-0 py-2"
                        onClick={() =>
                            inCart
                                ? removeToCart({ _id })
                                : addToCart({ ...props, price: finalPrice })
                        }
                    >
                        {inCart ? <FaXmark /> : <FaCartPlus />}
                        {inCart ? "Remove " : "Add To Cart"}
                    </button>
                )}
            </div>

            <div className="p-2">
                <h1 className="text-wrap whitespace-pre-wrap">{name}</h1>
                <div className="mt-2 flex flex-wrap justify-between ">
                    <p className="text-secondary-100 font-medium text-tertiary-100">
                        {formatNumber.format(finalPrice)}
                        <span className="ml-3 text-black/50 line-through">
                            {discount > 0 ? `₱${price}` : null}
                        </span>
                    </p>
                    <div className="flex-center justify-start gap-1 ">
                        <img
                            src={ratingImg}
                            alt=""
                            className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                        />{" "}
                        <span className="text-black/50">({rate_count})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
