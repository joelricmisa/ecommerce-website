import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, CartCard, SvgIcon } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { box } from "../assets/icons/SvgIconsList";

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
			<div className="w-full text-center border border-black rounded-sm font-poppins ">
				<h1 className="py-5 font-medium border-b rounded-sm shadow-sm">
					Shopping Cart ({cartItems.length} {cartItems.length > 1 ? "products" : "product"})
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

				<Link
					to={"/"}
					className="block button ">
					Go to Shop
				</Link>
			</div>
			<div className="flex-col items-start gap-10 flex-between xl:flex-row padding-y">
				<div className="flex items-center w-full gap-4 xl:items-start xl:w-1/2">
					<input
						type="text"
						placeholder="Coupon Code"
						className="input w-3/5 py-3.5 rounded-sm"
					/>
					<button className="w-2/5 px-5 button">Apply Coupon</button>
				</div>
				<div className="flex flex-col w-full px-5 py-10 border border-black rounded-md xl:w-2/5">
					<h1 className="text-xl font-medium mb-7">Cart Total</h1>
					<p className="w-full pb-4 mb-4 border-b flex-between border-black/30">
						Subtotal: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<p className="w-full pb-4 mb-4 border-b flex-between border-black/30">
						Shipping: <span>Free</span>
					</p>
					<p className="w-full pb-4 mb-4 flex-between">
						Total: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					{/* <span className="absolute bg-black inset-0 text-white z-[99]">hello</span> */}
					<button
						type="button"
						className="button"
						onClick={() => (disabled ? setAlert(true) : navigate("checkout"))}>
						Process to Checkout
					</button>
					{disabled ? (
						<div className={`${alert ? "fixed" : "hidden"} bg-black/30 top-0 left-0  min-h-screen min-w-full text-white z-[99]`}>
							<span
								className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-extraColor p-5 rounded-md  text-center text-black max-w-[400px] flex-center flex-col`}>
								<SvgIcon icon={box("w-20 h-20")} />
								Your cart is empty, please add some products before checking out your cart.
								<button
									className="py-2 button"
									onClick={() => setAlert(false)}>
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
