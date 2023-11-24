import { SvgIcon } from "./index";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaXmark } from "react-icons/fa6";
import { fiveStar, fourHalfStar, fourStar, threeStar } from "../assets/images";
const WishlistCard = (props) => {
    const { _id, name, image, price, rating, discount, iconValue, iconName } =
        props;

    const { cartItems, addToCart, removeToCart, removeToWishlist } =
        useContext(ShopContext);
    const [inCart, setInCart] = useState(false);
    const navigate = useNavigate();
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    useEffect(() => {
        const filterCart = cartItems.filter((item) => item._id === _id);
        filterCart.length === 0 ? setInCart(false) : setInCart(true);
    }, [cartItems]);

    console.log(props);
    let ratingImg;

    switch (rating) {
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

    return (
        <div className="flex min-h-[300px] flex-col  rounded-sm  transition-transform hover:scale-105 hover:shadow-sm  hover:ring-1 hover:ring-black/10 hover:ring-offset-2">
            <div className="grid-center relative h-[270px] w-full bg-extraColor">
                {discount && (
                    <span className="grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary">
                        -{discount}%
                    </span>
                )}
                <span
                    className="icon grid-center absolute right-3 top-3"
                    onClick={() => {
                        iconName === "trash"
                            ? removeToWishlist({ _id })
                            : navigate(`/products/${_id}`);
                    }}
                >
                    <SvgIcon icon={iconValue} />
                </span>
                <img
                    src={
                        baseUrl +
                        image?.replace("public", "")?.replaceAll("\\", "/")
                    }
                    alt=""
                    className="scale-75 xs:scale-90 xl:scale-95"
                />

                <button
                    type="button"
                    className="button flex-center absolute inset-x-0 bottom-0 gap-2 bg-black px-0 py-2"
                    onClick={() =>
                        inCart ? removeToCart({ _id }) : addToCart({ ...props })
                    }
                >
                    {inCart ? <FaXmark /> : <FaCartPlus />}
                    {inCart ? "Remove " : "Add To Cart"}
                </button>
            </div>

            <div className="grid w-full grid-rows-3 p-2">
                <h1 className="font-medium">{name}</h1>
                <p className="font-medium text-tertiary-100">
                    ₱{price}
                    <span className="ml-3 text-black/50 line-through">
                        ₱{price}
                    </span>
                </p>
                {rating && (
                    <span className="flex-center justify-start gap-1">
                        <img
                            src={ratingImg}
                            alt=""
                            className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                        />{" "}
                        <span className="text-black/50">({rating})</span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default WishlistCard;
