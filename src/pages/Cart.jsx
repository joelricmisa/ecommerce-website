import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, CartCard, SvgIcon } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { FaInbox } from "react-icons/fa6";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const [totalAmount, setTotalAmount] = useState(getTotalCartAmount());
    const formatNumber = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
    });

    const [disabled, setDisabled] = useState(true);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setTotalAmount(getTotalCartAmount());
        cartItems.length !== 0 ? setDisabled(false) : setDisabled(true);
    }, [cartItems]);
    return (
        <div className="padding-x animate">
            <Breadcrumb />
            <div className="w-full rounded-sm border border-black text-center font-poppins ">
                <h1 className="rounded-sm border-b py-5 font-medium shadow-sm">
                    Shopping Cart ({cartItems.length}{" "}
                    {cartItems.length > 1 ? "products" : "product"})
                </h1>

                {cartItems.map((product, index) => (
                    <CartCard
                        key={index}
                        id={product.id}
                        productImage={product.productImage}
                        productName={product.productName}
                        currentPrice={product.currentPrice.replace("$", "")}
                        quantity={product.quantity}
                    />
                ))}

                <Link to={"/"} className="button block ">
                    Go to Shop
                </Link>
            </div>
            <div className="flex-between padding-y flex-col items-start gap-10 xl:flex-row">
                <div className="flex w-full items-center gap-4 xl:w-1/2 xl:items-start">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="input w-3/5 rounded-sm py-3.5"
                    />
                    <button className="button w-2/5 px-5">Apply Coupon</button>
                </div>
                <div className="flex w-full flex-col rounded-md border border-black px-5 py-10 xl:w-2/5">
                    <h1 className="mb-7 text-xl font-medium">Cart Total</h1>
                    <p className="flex-between mb-4 w-full border-b border-black/30 pb-4">
                        Subtotal:{" "}
                        <span>{formatNumber.format(totalAmount)}</span>
                    </p>
                    <p className="flex-between mb-4 w-full border-b border-black/30 pb-4">
                        Shipping: <span>Free</span>
                    </p>
                    <p className="flex-between mb-4 w-full pb-4">
                        Total: <span>{formatNumber.format(totalAmount)}</span>
                    </p>
                    {/* <span className="absolute bg-black inset-0 text-white z-[99]">hello</span> */}
                    <button
                        type="button"
                        className="button"
                        onClick={() =>
                            disabled ? setAlert(true) : navigate("checkout")
                        }
                    >
                        Process to Checkout
                    </button>
                    {disabled ? (
                        <div
                            className={`${
                                alert ? "fixed" : "hidden"
                            } left-0 top-0 z-[99]  min-h-screen min-w-full bg-black/30 text-white`}
                        >
                            <span
                                className={`flex-center absolute left-1/2 top-1/2 max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-md bg-extraColor p-5 text-center text-black`}
                            >
                                <FaInbox className="text-3xl" /> Your cart is
                                empty, please add some products before checking
                                out your cart.
                                <button
                                    className="button py-2"
                                    onClick={() => setAlert(false)}
                                >
                                    OK
                                </button>
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
