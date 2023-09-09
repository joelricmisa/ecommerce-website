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
	const formatNumber = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	});
	const slice = cartItems.slice(0, 5);
	const showVal = cartItems.length - 5;
	const [show, setShow] = useState(false);
	return (
		<div className="padding-x animate">
			<Breadcrumb />
			<h1 className="text-3xl font-medium font-inter ">Billing Details</h1>
			<div className="flex-col items-start w-full mt-10 flex-between xl:flex-row">
				<div className="flex flex-col w-full xl:w-2/5 ">
					{billingDetails.map((input, index) => (
						<label
							key={index}
							htmlFor={input.id}
							className="checkLabel">
							{input.label}
							<input
								type={input.type}
								className="mt-2 input"
							/>
						</label>
					))}
				</div>
				<div className="flex flex-col w-full xl:w-1/2 padding-y xl:py-0 xl:pb-24">
					<h1 className="justify-start mb-10 text-xl font-medium  xl:ml-auto xl:-mt-10 flex-center">
						<SvgIcon icon={cart()} />
						Cart
					</h1>

					{show
						? cartItems.map((item, index) => (
								<div
									key={index}
									className="pb-3 mb-3 border-b flex-center border-black/10 ">
									<img
										src={item.productImage}
										alt=""
										className="w-14 h-14"
									/>
									<p>
										{item.productName} ({item.quantity})
									</p>
									<p className="ml-auto">{formatNumber.format(item.subTotal)}</p>
								</div>
						  ))
						: slice.map((item, index) => (
								<div
									key={index}
									className="pb-3 mb-3 border-b flex-center border-black/10">
									<img
										src={item.productImage}
										alt=""
										className="w-14 h-14"
									/>
									<p>
										{item.productName} ({item.quantity})
									</p>
									<p className="ml-auto">{formatNumber.format(item.subTotal)}</p>
								</div>
						  ))}

					{cartItems.length > 5 && (
						<button
							onClick={() => setShow(!show)}
							className="w-1/2 my-5 rounded-md button">
							{!show ? "Show More" : showVal > 1 ? "Hide Products" : "Hide Product"} ({showVal})
						</button>
					)}

					<p className="pb-4 mt-10 mb-4 border-b flex-between border-black/30">
						Subtotal: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<p className="pb-4 mb-4 border-b flex-between border-black/30">
						Shipping: <span>Free</span>
					</p>
					<p className="pb-4 mb-4 flex-between">
						Total: <span>{formatNumber.format(totalAmount)}</span>
					</p>
					<div className="flex gap-5">
						<div>
							<label
								htmlFor="bank"
								className="flex gap-2">
								<input
									type="radio"
									name="payment"
									id="bank"
								/>
								Bank
							</label>

							<br />
							<label
								htmlFor="cod"
								className="flex gap-2">
								<input
									type="radio"
									name="payment"
									id="cod"
								/>
								Cash on Delivery
							</label>
						</div>
						<div className="h-10 ml-auto -mt-1 flex-center">
							<img
								src={visa}
								alt="visa"
								className="h-5 w-14"
							/>
							<img
								src={masterCard}
								alt="master card"
								className="h-8 w-14"
							/>
						</div>
					</div>
					<div className="mt-10 flex-center">
						<input
							type="text"
							placeholder="Coupon Code"
							className="w-3/5 input"
						/>
						<button className="w-2/5 button">Apply Coupon</button>
					</div>
					<button className="mx-0 mt-10 button xl:w-2/5">Place Order</button>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
