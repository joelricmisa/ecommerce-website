import { SvgIcon } from "./index";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaXmark } from "react-icons/fa6";
const WishlistCard = ({
    id,
    productName,
    productImage,
    currentPrice,
    originalPrice,
    rating,
    rateCount,
    discountPercentage,
    iconValue,
    iconName,
    quantity,
    subTotal,
}) => {
    const { cartItems, addToCart, removeToCart, removeToWishlist } =
        useContext(ShopContext);
    const [inCart, setInCart] = useState(false);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const filterCart = cartItems.filter((item) => item.id === id);
        filterCart.length === 0 ? setInCart(false) : setInCart(true);
    }, [cartItems]);

    return (
        <div className="flex min-h-[300px] flex-col  rounded-sm  transition-transform hover:scale-105 hover:shadow-sm  hover:ring-1 hover:ring-black/10 hover:ring-offset-2">
            <div className="grid-center relative h-[270px] w-full bg-extraColor">
                {discountPercentage && (
                    <span className="grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary">
                        {discountPercentage}
                    </span>
                )}
                <span
                    className="icon grid-center absolute right-3 top-3"
                    onClick={() => {
                        iconName === "trash"
                            ? removeToWishlist({ id })
                            : navigate(`/products/${id}`);
                    }}
                >
                    <SvgIcon icon={iconValue} />
                </span>
                <img
                    src={productImage}
                    alt=""
                    className="scale-75 xs:scale-90 xl:scale-95"
                />

                <button
                    type="button"
                    className="button flex-center absolute inset-x-0 bottom-0 gap-2 bg-black px-0 py-2"
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
                    {inCart ? <FaXmark /> : <FaCartPlus />}
                    {inCart ? "Remove " : "Add To Cart"}
                </button>
            </div>

            <div className="grid w-full grid-rows-3 p-2">
                <h1 className="font-medium">{productName}</h1>
                <p className="font-medium text-tertiary-100">
                    {currentPrice}
                    <span className="ml-3 text-black/50 line-through">
                        {originalPrice}
                    </span>
                </p>
                {rating && (
                    <span className="flex-center justify-start gap-1">
                        <img
                            src={rating}
                            alt=""
                            className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                        />{" "}
                        <span className="text-black/50">({rateCount})</span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default WishlistCard;
