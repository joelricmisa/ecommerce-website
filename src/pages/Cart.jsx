import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, CartCard } from "../components";
import { ShopContext } from "../contexts/ShopContext";

const Cart = () => {
	const { cartItems, getTotalCartAmount } = useContext(ShopContext);
	const [totalAmount, setTotalAmount] = useState(getTotalCartAmount());
	const formatNumber = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	});

	useEffect(() => {
		setTotalAmount(getTotalCartAmount());
	}, [cartItems]);
	return (
		<div className="padding-x animate">
			<Breadcrumb />
			<div className="w-full  text-center font-poppins  rounded-sm  border  border-black  ">
				<h1 className="py-5 shadow-sm rounded-sm font-medium border-b">
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

				<Link to={"/"} className="button block ">
					Return to Shop
				</Link>
			</div>
			<div className="flex-between  flex-col xl:flex-row  gap-10 items-start padding-y">
				<div className="flex xl:items-start items-center xl:w-1/2 w-full gap-4">
					<input type="text" placeholder="Coupon Code" className="input w-3/5 py-3.5 rounded-sm" />
					<button className="w-2/5 button px-5">Apply Coupon</button>
				</div>
				<div className="xl:w-2/5 w-full  px-5 py-10 flex flex-col  border-black rounded-md border">
					<h1 className="font-medium mb-7 text-xl">Cart Total</h1>
					<p className="flex-between w-full  mb-4 pb-4 border-black/30 border-b">
						Subtotal: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<p className="flex-between w-full  mb-4 pb-4 border-black/30 border-b">
						Shipping: <span>Free</span>
					</p>
					<p className="flex-between w-full  mb-4 pb-4">
						Total: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<Link type="button" to={"checkout"} className="button">
						Process to Checkout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
