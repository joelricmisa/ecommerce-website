import { memo, useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "../hooks";
import { computePrice, formatPrice, getImage } from "../utils";

const CartCard = ({ product_id, quantity }) => {
    const { removeCartItem, setTriggerQty, updateItemQty } =
        useContext(ShopContext);
    const { auth } = useAuth();

    const [qty, setQty] = useState(quantity);

    const finalPrice = computePrice(product_id?.price, product_id?.discount);

    const productSubTotal = Number(finalPrice) * Number(qty);

    const imageSource = getImage(product_id?.image);

    useEffect(() => {
        let productsQty = JSON.parse(localStorage.getItem("productQty"));

        productsQty === null ? (productsQty = []) : null;

        const productIndex = productsQty?.findIndex((item) => {
            return item._id === product_id._id;
        });

        if (productIndex !== -1) {
            productsQty?.splice(productIndex, 1, {
                product_id: {
                    _id: product_id._id,
                },
                quantity: qty,
            });
        } else {
            productsQty.push({
                product_id: {
                    _id: product_id._id,
                },
                quantity: qty,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));
        setTriggerQty(1);
    }, [qty]);

    useEffect(() => {
        setQty(quantity);
    }, [removeCartItem]);

    useEffect(() => {
        if (auth) {
            const data = setTimeout(() => {
                updateItemQty({
                    product_id: { _id: product_id?._id },
                    quantity: qty,
                });
            }, 1000);

            return () => clearTimeout(data);
        } else {
            updateItemQty({ _id: product_id?._id, quantity: qty });
        }
    }, [qty]);

    return (
        <div className="flex-center relative w-full gap-0 rounded-sm shadow-sm last:mb-0">
            <div className="flex-center w-1/2 flex-col justify-evenly border-r border-black/10 px-2 py-5 xl:w-2/6 xl:flex-row xl:justify-start xl:border-r-0 xl:pl-28 ">
                <img
                    src={imageSource}
                    className="h-16 w-20 object-contain"
                    alt=""
                />
                <p> {product_id?.name}</p>
            </div>
            <div className="flex-center w-1/2 flex-col pb-10 pt-14 xl:w-4/6 xl:flex-row">
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p>{formatPrice(finalPrice)} (1)</p>

                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={`${qty < 10 ? `0${qty}` : qty}`}
                        className="input w-16 text-center font-inter "
                        onChange={(e) => setQty(Number(e.target.value))}
                    />
                </div>
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p className="">
                        <span className="mr-1 font-semibold">Subtotal:</span>{" "}
                        {formatPrice(productSubTotal)}{" "}
                    </p>
                    <span
                        className="flex-center absolute  right-0 top-0  h-8 w-8 cursor-pointer bg-tertiary-100 p-0.5 shadow-sm hover:bg-tertiary-200 hover:ring hover:ring-black/100 active:bg-tertiary-300 xl:static"
                        onClick={() =>
                            removeCartItem({
                                _id: product_id._id,
                                name: product_id?.name,
                            })
                        }
                    >
                        <FaXmark className="fill-white" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(CartCard);
