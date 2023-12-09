import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FaXmark } from "react-icons/fa6";
const CartCard = ({ _id, name, image, price, quantity, discount }) => {
    const { cartItems, setCartItems, removeCartItem } = useContext(ShopContext);
    const [qty, setQty] = useState(quantity);
    const finalPrice = Number(price) - Number(price) * (discount / 100);
    const productSubTotal = Number(finalPrice) * Number(qty);

    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = ` ${baseUrl}${image
        ?.replace("public", "")
        ?.replaceAll("\\", "/")}`;

    useEffect(() => {
        const cartList = cartItems.map((item) =>
            item._id === _id
                ? {
                      ...item,
                      quantity: qty,
                  }
                : item,
        );
        //not auth
        setCartItems(cartList);
        //auth
        // updateCartItems();
    }, [qty]);

    //not auth
    useEffect(() => {
        setQty(quantity);
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
                        max={99}
                        value={quantity < 10 ? `0${quantity}` : quantity}
                        className="input w-16 text-center font-inter "
                        onChange={(e) => setQty(e.target.value)}
                    />
                </div>
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p className="">
                        <span className="mr-1 font-semibold">Subtotal:</span>{" "}
                        {formatNumber.format(productSubTotal)}{" "}
                    </p>
                    <span
                        className="flex-center absolute  right-0 top-0  h-8 w-8 cursor-pointer bg-tertiary-100 p-0.5 shadow-sm hover:bg-tertiary-200 hover:ring hover:ring-black/70 active:bg-tertiary-300 xl:static"
                        onClick={() => removeCartItem({ _id: _id })}
                    >
                        <FaXmark className="fill-white" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
