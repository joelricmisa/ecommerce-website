import { useEffect, useState, useContext, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    FaCartPlus,
    FaHeart,
    FaRegEye,
    FaRegHeart,
    FaSpinner,
    FaXmark,
} from "react-icons/fa6";
import { fiveStar, fourHalfStar, fourStar, threeStar } from "../assets/images";
import { ShopContext } from "../contexts/ShopContext";

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

    const numberFormatter = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    const finalPrice = Number(price) - Number(price) * (discount / 100);

    // base url for prod env
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = `${baseUrl}${image
        ?.replace("public", "")
        ?.replaceAll("\\", "/")}`;

    const ratingImages = {
        3: threeStar,
        4: fourStar,
        4.5: fourHalfStar,
        5: fiveStar,
    };

    const ratingImg = ratingImages[rating];

    //styles variables,
    const mainBoxStyle = `group relative mr-4 flex min-h-[300px]  snap-start flex-col overflow-hidden rounded-sm  transition-transform hover:scale-105  hover:shadow-sm ring-1 ring-black/10  ring-offset-2  lg:mx-5 
    ${controlWidth ? "w-[170px] md:w-[200px] lg:w-[300px]" : "w-auto"} `;

    //Product Card Components
    const DiscountBox = () => {
        const discountStyle = `grid-center absolute left-3 top-3 h-6 w-14 rounded-sm bg-tertiary-100 text-xs text-primary`;

        return (
            discount > 0 && <span className={discountStyle}>-{discount}%</span>
        );
    };

    const WishlistBtn = () => {
        const {
            wishlistItems,
            addToWishlist,
            removeWishlistItem,
            // isLoading,
            // setIsLoading,
        } = useContext(ShopContext);

        const [activeWishlist, setActiveWishlist] = useState(false);

        const wishlistStyle = `icon grid-center disabled:cursor-auto  ${
            activeWishlist ? "text-tertiary-100" : "hover:text-tertiary-100"
        }`;

        useEffect(() => {
            const isItemInWishlist = wishlistItems?.find(
                (item) => item._id === _id,
            );
            setActiveWishlist((prev) => isItemInWishlist);
        }, [wishlistItems?.length]);

        const handleWishlistButtonClick = () => {
            // setIsLoading((prev) => !prev);
            activeWishlist
                ? removeWishlistItem({ _id, name })
                : addToWishlist({ ...props });
        };

        return (
            <button
                className={wishlistStyle}
                // disabled={isLoading}
                onClick={() => handleWishlistButtonClick()}
            >
                {activeWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
        );
    };

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
            // isLoading, setIsLoading
        } = useContext(ShopContext);

        const [inCart, setInCart] = useState(false);

        const handleCartButtonClick = () => {
            // setIsLoading((prev) => !prev);
            inCart
                ? removeCartItem({ _id, name })
                : addToCart({ ...props, price: finalPrice });
        };

        useEffect(() => {
            const isItemInCart = cartItems?.some((item) => item._id === _id);
            setInCart((prev) => isItemInCart);
        }, [cartItems?.length]);

        return (
            <button
                type="button"
                className="button group-hover:flex-center absolute inset-x-0 bottom-0 hidden gap-2 bg-secondary px-0 py-2 disabled:bg-gray-400"
                // disabled={isLoading}
                onClick={() => handleCartButtonClick()}
            >
                {/* {isLoading ? (
                    <span className="mx-auto flex items-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Updating..
                    </span>
                ) : (
                    <>
                        {inCart ? <FaXmark /> : <FaCartPlus />}
                        {inCart ? "Remove " : "Add To Cart"}
                    </>
                )} */}
                <>
                    {inCart ? <FaXmark /> : <FaCartPlus />}
                    {inCart ? "Remove " : "Add To Cart"}
                </>
            </button>
        );
    };

    const DetailsBox = () => (
        <div className="px-2 py-4">
            <h1 className="text-wrap whitespace-pre-wrap">{name}</h1>
            <div className="mt-2 flex flex-wrap justify-between ">
                <p className="text-secondary-100 font-medium text-tertiary-100">
                    {numberFormatter.format(finalPrice)}
                    <span className="ml-3 text-black/50 line-through">
                        {discount > 0 ? `₱${price}` : null}
                    </span>
                </p>
                <div className="flex-center justify-start gap-1 ">
                    <img
                        src={ratingImg}
                        alt=""
                        className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
                    />
                    <span className="text-black/50">({rate_count})</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className={mainBoxStyle}>
            <div className="grid-center relative h-[270px] w-full  bg-extraColor">
                <DiscountBox />

                <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <WishlistBtn />
                    <PreviewBtn />
                </div>

                <img
                    src={imageSource}
                    className="scale-75  xl:scale-95"
                    alt=""
                />

                <CartBtn />
            </div>

            <DetailsBox />
        </div>
    );
};

export default memo(ProductCard);
