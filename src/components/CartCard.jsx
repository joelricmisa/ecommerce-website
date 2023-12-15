import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaXmark } from "react-icons/fa6";

const CartCard = ({ _id, name, image, price, discount }) => {
    const { removeCartItem, setTriggerQty } = useContext(ShopContext);

    const getProductQuantity = () => {
        const itemsQty = JSON.parse(localStorage.getItem("productQty"));

        const productQty = itemsQty?.filter((item) => {
            return item.id === _id;
        });

        const result = productQty?.[0]?.quantity;
        // console.log(productQty[0].quantity);
        return result ? result : 1;
    };

    const [quantity, setQuantity] = useState(getProductQuantity());
    const finalPrice = Number(price) - Number(price) * (discount / 100);
    const productSubTotal = Number(finalPrice) * Number(quantity);

    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = ` ${baseUrl}${image
        ?.replace("public", "")
        ?.replaceAll("\\", "/")}`;

    useEffect(() => {
        let productsQty = JSON.parse(localStorage.getItem("productQty"));

        productsQty === null ? (productsQty = []) : null;

        const productIndex = productsQty?.findIndex((item) => {
            return item.id === _id;
        });

        if (productIndex !== -1) {
            productsQty?.splice(productIndex, 1, {
                id: _id,
                quantity: quantity,
            });
        } else {
            productsQty.push({
                id: _id,
                quantity: quantity,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));
        setTriggerQty(1);
    }, [quantity]);

    useEffect(() => {
        setQuantity(getProductQuantity());
    }, [removeCartItem]);

    return (
        <div className="flex-center relative w-full gap-0 rounded-sm shadow-sm last:mb-0">
            <div className="flex-center w-1/2 flex-col justify-evenly border-r border-black/10 px-2 py-5 xl:w-2/6 xl:flex-row xl:justify-start xl:border-r-0 xl:pl-28 ">
                <img
                    src={imageSource}
                    className="h-16 w-20 object-contain"
                    alt=""
                />
                <p> {name}</p>
            </div>
            <div className="flex-center w-1/2 flex-col pb-10 pt-14 xl:w-4/6 xl:flex-row">
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p>{formatNumber.format(finalPrice)} (1)</p>

                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={`${quantity < 10 ? `0${quantity}` : quantity}`}
                        className="input w-16 text-center font-inter "
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p className="">
                        <span className="mr-1 font-semibold">Subtotal:</span>{" "}
                        {formatNumber.format(productSubTotal)}{" "}
                    </p>
                    <span
                        className="flex-center absolute  right-0 top-0  h-8 w-8 cursor-pointer bg-tertiary-100 p-0.5 shadow-sm hover:bg-tertiary-200 hover:ring hover:ring-black/100 active:bg-tertiary-300 xl:static"
                        onClick={() => removeCartItem({ _id: _id, name })}
                    >
                        <FaXmark className="fill-white" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
