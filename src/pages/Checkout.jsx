import React, { useState } from "react";
import { Breadcrumb, SvgIcon } from "../components";
import { billingDetails } from "../constants";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { visa, masterCard } from "../assets/logo";
import { cart } from "../assets/icons/SvgIconsList";

const Checkout = () => {
	const { cartItems, getTotalCartAmount } = useContext(ShopContext);
	const totalAmount = getTotalCartAmount();
	const formatNumber = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });
	const slice = cartItems.slice(0, 5);
	const showVal = cartItems.length - 5;
	const [show, setShow] = useState(false);
	return (
		<div className="w-10/12 mx-auto py-20">
			<Breadcrumb />
			<h1 className="text-3xl font-inter font-medium -ml-2">Billing Details</h1>
			<div className="flex justify-between -ml-2 w-full mt-10">
				<div className="flex flex-col w-2/5  font-poppins">
					{billingDetails.map((input, index) => (
						<label key={index} htmlFor={input.id} className="checkLabel">
							{input.label}
							<input type={input.type} className="input mt-2" />
						</label>
					))}
				</div>
				<div className="flex flex-col w-1/2 p-5 font-poppins">
					<h1 className=" ml-auto -mt-14 mb-10 text-xl font-medium flex items-center gap-4">
						<SvgIcon icon={cart()} />
						Cart
					</h1>

					{show
						? cartItems.map((item, index) => (
								<div key={index} className="flex items-center gap-4 mb-3 border-b border-black/10 pb-3 ">
									<img src={item.productImage} alt="" className="w-14 h-14" />
									<p>{item.productName}</p>
									<p className="ml-auto">{formatNumber.format(item.subTotal)}</p>
								</div>
						  ))
						: slice.map((item, index) => (
								<div key={index} className="flex items-center gap-4 mb-3 border-b border-black/10 pb-3">
									<img src={item.productImage} alt="" className="w-14 h-14" />
									<p>{item.productName}</p>
									<p className="ml-auto">{formatNumber.format(item.subTotal)}</p>
								</div>
						  ))}

					{cartItems.length > 5 && (
						<button onClick={() => setShow(!show)} className="bg-secondary text-white py-3 w-1/2 mx-auto rounded-md my-5">
							{!show ? "Show More" : "Hide Product"} ({showVal})
						</button>
					)}

					<p className="flex justify-between w-full  mb-4 pb-4 mt-10 border-black/30 border-b">
						Subtotal: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<p className="flex justify-between w-full  mb-4 pb-4 border-black/30 border-b">
						Shipping: <span>Free</span>
					</p>
					<p className="flex justify-between w-full  mb-4 pb-4">
						Total: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<div className="flex gap-5">
						<div>
							<label htmlFor="bank" className="flex gap-2">
								<input type="radio" name="payment" id="bank" />
								Bank
							</label>

							<br />
							<label htmlFor="cod" className="flex gap-2">
								<input type="radio" name="payment" id="cod" />
								Cash on Delivery
							</label>
						</div>
						<div className="flex gap-2 items-center bg-gray-200 ml-auto -mt-1 h-10">
							<img src={visa} alt="visa" className="h-5 w-14" />
							<img src={masterCard} alt="master card" className="h-8 w-14" />
						</div>
					</div>
					<div className="flex items-start mt-10  gap-4">
						<input type="text" placeholder="Coupon Code" className="w-3/5 px-3 py-2 h-14 border border-black rounded-sm" />
						<button className="w-2/5 py-4 bg-secondary h-14 text-white font-medium rounded-sm">Apply Coupon</button>
					</div>
					<button className="w-2/5 py-4 bg-secondary h-14 text-white font-medium mt-10 rounded-sm">Place Order</button>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
