import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components";
import { shopProductsData } from "../constants";
import { useLocation, Link } from "react-router-dom";
import { returnIcon, truck } from "../assets/icons";
import { ShopContext } from "../contexts/ShopContext";
import {
    FaCartPlus,
    FaHeart,
    FaInbox,
    FaRegHeart,
    FaXmark,
} from "react-icons/fa6";

const ProductPreview = () => {
    const location = useLocation();
    const { id } = useParams();
    const currentItem = shopProductsData.filter(
        (product) => product.id === Number(id),
    );
    const productObj = currentItem[0];

    const {
        cartItems,
        addToCart,
        removeToCart,
        addToWishlist,
        removeToWishlist,
        wishlistItems,
        setCategory,
    } = useContext(ShopContext);

    const crumbsList = [
        { label: "Home", path: "/", setCateg: "all" },
        { label: "Products", path: "/products", setCateg: "all" },
        {
            label: productObj.category,
            path: "/products",
            setCateg: productObj.category,
        },
        {
            label: productObj.productName,
            path: location.pathname,
            setCateg: "all",
        },
    ];

    const [quantity, setQuantity] = useState(1);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [activeWishlist, setActiveWishlist] = useState(false);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const filterWishlist = wishlistItems.filter(
            (item) => item.id === Number(id),
        );
        const filterCart = cartItems.filter((item) => item.id === Number(id));
        filterWishlist.length === 0
            ? setActiveWishlist(false)
            : setActiveWishlist(true);
        filterCart.length === 0 ? setInCart(false) : setInCart(true);
    }, [wishlistItems, cartItems, id]);

    useEffect(() => {
        const relatedItems = shopProductsData
            .filter((product) => product.category === productObj?.category)
            .filter((item) => item.id !== Number(id));

        setRelatedProduct(relatedItems);
    }, [id]);

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
                        src={productObj.productImage}
                        alt=""
                        className="scale-100 xl:scale-150"
                    />
                </div>

                <div className="flex-center w-full flex-col items-start gap-3 xl:w-1/2">
                    <h1 className="text-2xl font-semibold">
                        {productObj.productName}
                    </h1>
                    <span className="flex-center justify-start text-black/60 ">
                        <img src={productObj.rating} alt="" />
                        <p>({productObj.rateCount} Reviews)</p>
                    </span>
                    <p className="text-2xl">{productObj.currentPrice}</p>
                    <p className="border-b border-black/10 pb-5 text-sm leading-7">
                        {productObj.description}
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
                                    ? removeToCart({ id: Number(id) })
                                    : addToCart({
                                          ...productObj,
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
                                    ? removeToWishlist({ id: Number(id) })
                                    : addToWishlist(productObj)
                            }
                        >
                            {activeWishlist ? <FaHeart /> : <FaRegHeart />}
                        </span>
                    </div>
                    <div className="my-3 flex w-full flex-col text-sm">
                        <p className="flex-center border-black/ justify-start border p-3 ">
                            <img src={truck} alt="" />
                            <span>
                                Free delivery <br />
                                Enter your postal code for Delivery Availability
                            </span>
                        </p>
                        <p className="flex-center border-black/ justify-start border p-3 ">
                            <img src={returnIcon} alt="" />
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

                    {relatedProduct.length > 1
                        ? "Related Items"
                        : "Related Item"}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
                    {relatedProduct.length !== 0 ? (
                        relatedProduct.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
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
                            );
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
