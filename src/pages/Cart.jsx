import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, CartCard } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import useAuth from "../hooks/useAuth";
import FeedbackContext from "../contexts/FeedbackProvider";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, totalAmount } = useContext(ShopContext);
    const { setShowModal, setModalMessage, setType } =
        useContext(FeedbackContext);
    const { auth } = useAuth();
    const numberFormatter = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    const [emptyCart, setEmptyCart] = useState(true);
    const [hasUser, setHasUser] = useState(true);

    useEffect(() => {
        cartItems?.length !== 0 ? setEmptyCart(false) : setEmptyCart(true);
    }, [cartItems]);

    useEffect(() => {
        auth ? setHasUser(true) : setHasUser(false);
    }, [auth]);

    useEffect(() => {
        setType("error");

        {
            !hasUser && emptyCart
                ? setModalMessage(
                      "Your cart is empty, please add some products and make sure you have an account before checking out your cart.",
                  )
                : !hasUser && !emptyCart
                ? setModalMessage(
                      "Please make an account first or login your account if you already have to checkout your cart.",
                  )
                : hasUser && emptyCart
                ? setModalMessage(
                      "Your cart is empty, please add some products before checking out your cart.",
                  )
                : null;
        }
    }, [hasUser, emptyCart]);

    return (
        <div className="padding-x animate">
            <Breadcrumb />
            <div className="w-full rounded-sm border border-black text-center font-poppins ">
                <h1 className="rounded-sm border-b py-5 font-medium shadow-sm">
                    Shopping Cart ({cartItems?.length}{" "}
                    {cartItems?.length > 1 ? "products" : "product"})
                </h1>

                {cartItems?.map((product, index) => (
                    <CartCard key={index} {...product} />
                ))}

                <Link to={"/products"} className="button block ">
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
                        <span>{numberFormatter.format(totalAmount)}</span>
                    </p>
                    <p className="flex-between mb-4 w-full border-b border-black/30 pb-4">
                        Shipping: <span>Free</span>
                    </p>
                    <p className="flex-between mb-4 w-full pb-4">
                        Total:{" "}
                        <span>{numberFormatter.format(totalAmount)}</span>
                    </p>
                    {/* <span className="absolute bg-black inset-0 text-white z-[99]">hello</span> */}
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            !hasUser ? setShowModal(true) : null;
                            emptyCart ? setShowModal(true) : null;
                            hasUser && !emptyCart ? navigate("checkout") : null;
                        }}
                    >
                        Process to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
