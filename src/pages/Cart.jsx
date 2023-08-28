import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartData } from "../constants";
import { Breadcrumb, QuantityState } from "../components";
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
		<div className="w-10/12 mx-auto py-20">
			<Breadcrumb />
			<div className="w-full  text-center font-poppins  rounded-sm  border [&>div]:mb-5 border-black  ">
				<div className="grid grid-cols-6 py-5  shadow-sm rounded-sm font-medium border-b">
					{cartData.tableHeaders.map((head, index) => (
						<h1 key={index} className="first:col-span-2 ">
							{head.title}
						</h1>
					))}
				</div>

				{cartItems.map((product, index) => (
					<div key={index} className="grid grid-cols-6  py-5  shadow-sm rounded-sm last:mb-0">
						<div className="flex-center col-span-2 justify-start pl-24  w-full">
							<img src={product.productImage} className="h-10 w-12" alt="" /> {product.productName}
						</div>
						<p className="flex-center">{product.currentPrice}</p>
						<QuantityState productId={product.id} quantity={product.quantity} productPrice={product.currentPrice.replace("$", "")} />
					</div>
				))}

				<div className="grid grid-cols-6 ">
					<div className="col-span-5"></div>
					<Link to={"/"} className="py-3 w-[95%] border border-black/30 rounded-sm">
						Return to Shop
					</Link>
				</div>
			</div>
			<div className="flex-between mt-20 items-start">
				<div className="flex items-start w-1/2  gap-4">
					<input type="text" placeholder="Coupon Code" className="input w-3/5 py-3.5 rounded-sm" />
					<button className="w-2/5 button">Apply Coupon</button>
				</div>
				<div className="w-2/5  px-5 py-10 flex flex-col  border-black rounded-md border">
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
