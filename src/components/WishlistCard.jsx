import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaRegEye, FaTrashCan, FaXmark } from "react-icons/fa6";
import { ShopContext } from "../contexts/ShopContext";
import { FaSpinner } from "react-icons/fa";

import { ratingImages } from "../constants";
import { computePrice, formatPrice, getImage } from "../utils";
import { useWishlist } from "../hooks";

const WishlistCard = (props) => {
    const { _id, name, image, price, rating, discount } = props;
    const { removeWishlistItem } = useWishlist();

    const finalPrice = computePrice(price, discount);

    const imageSource = getImage(image);

    const ratingImg = ratingImages[rating];

    const mainBoxStyle = `flex min-h-[300px] flex-col  rounded-sm  transition-transform hover:scale-105 hover:shadow-sm  hover:ring-1 hover:ring-black/10 hover:ring-offset-2`;

    //Wishlist Card Components

    const DiscountBox = () => {
        const discountStyle = `grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary`;

        return (
            discount > 0 && <span className={discountStyle}>-{discount}%</span>
        );
    };

    const TrashBtn = () => (
        <span
            className="icon grid-center hover:text-tertiary-100"
            onClick={() => {
                removeWishlistItem({ _id, name });
            }}
        >
            <FaTrashCan className="hover:fill-tertiary-100" />
        </span>
    );

    const PreviewBtn = () => (
        <Link to={`/products/${_id}`} className="icon grid-center ">
            <FaRegEye className="hover:fill-tertiary-100" />
        </Link>
    );

    const CartBtn = () => {
        const {
            cartItems,
            addToCart,
            removeCartItem,
            isLoading,
            setIsLoading,
        } = useContext(ShopContext);

        const [inCart, setInCart] = useState(false);

        const handleCartButtonClick = () => {
            setIsLoading(true);
            inCart
                ? removeCartItem({ _id, name })
                : addToCart({
                      product_id: { ...props },
                      quantity: 1,
                      price: finalPrice,
                  });
        };

        useEffect(() => {
            const isItemInCart = cartItems?.some(
                (item) => item.product_id._id === _id,
            );
            setInCart((prev) => isItemInCart);
        }, [cartItems?.length]);

        return (
            <button
                type="button"
                className="button group-hover:flex-center absolute inset-x-0 bottom-0 hidden w-full gap-2 bg-secondary px-0 py-2 disabled:bg-gray-400"
                disabled={isLoading}
                onClick={() => handleCartButtonClick()}
            >
                {isLoading ? (
                    <span className="mx-auto flex items-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Updating
                    </span>
                ) : (
                    <>
                        {inCart ? <FaXmark /> : <FaCartPlus />}
                        {inCart ? "Remove " : "Add To Cart"}
                    </>
                )}

                {/* <>
                    {inCart ? <FaXmark /> : <FaCartPlus />}
                    {inCart ? "Remove " : "Add To Cart"}
                </> */}
            </button>
        );
    };

    const DetailsBox = () => (
        <div className="grid w-full grid-rows-3 p-2">
            <h1 className="font-medium">{name}</h1>
            <div className="mt-1 flex flex-wrap justify-between ">
                <p className="font-medium text-tertiary-100">
                    {formatPrice(finalPrice)}
                    <span className="ml-3 text-black/50 line-through">
                        {discount > 0 ? `₱${price}` : null}
                    </span>
                </p>
                {rating && (
                    <span className="flex-center justify-start gap-1">
                        <img
                            src={ratingImg}
                            alt=""
                            className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                        />
                        <span className="text-black/50">({rating})</span>
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className={mainBoxStyle}>
            <div className="grid-center group relative h-[270px] w-full bg-extraColor">
                <DiscountBox />
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <TrashBtn />
                    <PreviewBtn />
                </div>

                <img
                    src={imageSource}
                    alt=""
                    className="scale-75 xs:scale-90 xl:scale-95"
                />
                <CartBtn />
            </div>

            <DetailsBox />
        </div>
    );
};

export default WishlistCard;
