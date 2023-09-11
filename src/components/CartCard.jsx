import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { xMark } from "../assets/icons/SvgIconsList";
const CartCard = ({
    id,
    productName,
    productImage,
    currentPrice,
    quantity,
}) => {
    const { cartItems, setCartItems, removeToCart } = useContext(ShopContext);
    const [state, setState] = useState(quantity);
    const [productSubTotal, setProductSubTotal] = useState(
        Number(currentPrice) * Number(state),
    );
    const formatNumber = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
    });
    useEffect(() => {
        setProductSubTotal(Number(currentPrice) * Number(state));

        const cartList = cartItems.map((item) =>
            item.id === id
                ? { ...item, quantity: state, subTotal: productSubTotal }
                : item,
        );
        setCartItems(cartList);
    }, [state, productSubTotal]);
    useEffect(() => {
        setState(quantity);
    }, [removeToCart]);

    return (
        <div className="flex-center relative w-full gap-0 rounded-sm shadow-sm last:mb-0">
            <div className="flex-center w-1/2 flex-col justify-evenly border-r border-black/10 px-2 py-5 xl:w-2/6 xl:flex-row xl:justify-start xl:border-r-0 xl:pl-28 ">
                <img
                    src={productImage}
                    className="h-16 w-20 object-contain"
                    alt=""
                />
                <p> {productName}</p>
            </div>
            <div className="flex-center w-1/2 flex-col pb-10 pt-14 xl:w-4/6 xl:flex-row">
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p>${currentPrice} (1)</p>

                    <input
                        type="number"
                        min={1}
                        value={state < 10 ? `0${state}` : state}
                        className="input w-16 text-center font-inter "
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="flex-center justify-evenly xl:w-1/2 ">
                    <p className="">
                        <span className="mr-1 font-semibold">Subtotal:</span>{" "}
                        {formatNumber.format(productSubTotal)}{" "}
                    </p>
                    <span
                        className="flex-center absolute  right-0 top-0  h-8 w-8 cursor-pointer bg-tertiary-100 p-0.5 shadow-sm hover:bg-tertiary-200 hover:ring hover:ring-black/70 active:bg-tertiary-300 xl:static"
                        onClick={() => removeToCart({ id: id })}
                    >
                        <SvgIcon icon={xMark()} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
