import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartData } from "../constants";
import { Breadcrumb, QuantityState } from "../components";
import { ShopContext } from "../contexts/ShopContext";

const Cart = () => {
	const { cartItems, getTotalCartAmount } = useContext(ShopContext);
	const [totalAmount, setTotalAmount] = useState(getTotalCartAmount());
	const formatNumber = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });
	return (
		<div className="w-10/12 mx-auto py-20">
			<Breadcrumb />
			<div className="w-full  text-center font-poppins  rounded-sm [&>div]:mb-5 border border-black  ">
				<div className="grid grid-cols-5  py-5 shadow-sm rounded-sm font-medium border-b">
					{cartData.tableHeaders.map((head, index) => (
						<h1 key={index} className="first:col-span-2">
							{head.title}
						</h1>
					))}
				</div>

				{cartItems.map((product, index) => (
					<div key={index} className="grid grid-cols-5 place-items-center py-5  shadow-sm rounded-sm last:mb-0 ">
						<div className="flex items-center col-span-2 justify-start px-20 w-full gap-5">
							<img src={product.productImage} className="h-10 w-12" alt="" /> {product.productName}
						</div>
						<p>{product.currentPrice}</p>
						<QuantityState productId={product.id} quantity={product.quantity} productPrice={product.currentPrice.replace("$", "")} />
					</div>
				))}

				<div className="flex justify-between px-14">
					<Link className="py-3 px-10 border border-black/30 rounded-sm">Return to Shop</Link>
					<button
						type="button"
						className="py-3 px-10 border border-black/30 rounded-sm bg-secondary text-white"
						onClick={() => setTotalAmount(getTotalCartAmount)}>
						Update Cart Total
					</button>
				</div>
			</div>
			<div className="flex justify-between font-poppins mt-20">
				<div className="flex items-start w-1/2  gap-4">
					<input type="text" placeholder="Coupon Code" className="w-3/5 px-3 py-2 h-14 border border-black rounded-sm" />
					<button className="w-2/5 py-4 bg-secondary h-14 text-white font-medium">Apply Coupon</button>
				</div>
				<div className="w-2/5  px-5 py-10 flex flex-col  border-black rounded-md border">
					<h1 className="font-medium mb-7 text-xl">Cart Total</h1>
					<p className="flex justify-between w-full  mb-4 pb-4 border-black/30 border-b">
						Subtotal: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<p className="flex justify-between w-full  mb-4 pb-4 border-black/30 border-b">
						Shipping: <span>Free</span>
					</p>
					<p className="flex justify-between w-full  mb-4 pb-4">
						Total: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<Link to={"checkout"} className="w-3/4 mx-auto py-4 bg-secondary h-14 text-white font-medium rounded-sm text-center">
						Process to Checkout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
