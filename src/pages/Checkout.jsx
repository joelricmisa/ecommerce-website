import React, { useState } from "react";
import { Breadcrumb } from "../components";
import { billingDetails } from "../constants";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { visa, masterCard } from "../assets/logo";
import { FaCartShopping } from "react-icons/fa6";

const Checkout = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    const slice = cartItems?.slice(0, 5);
    const showVal = cartItems?.length - 5;
    const [show, setShow] = useState(false);
    const baseUrl = "https://exclusive-backend-te81.onrender.com";
    return (
        <div className="padding-x animate">
            <Breadcrumb />
            <h1 className="font-inter text-3xl font-medium ">
                Billing Details
            </h1>
            <div className="flex-between mt-10 w-full flex-col items-start xl:flex-row">
                <div className="flex w-full flex-col xl:w-2/5 ">
                    {billingDetails?.map((input, index) => (
                        <label
                            key={index}
                            htmlFor={input.id}
                            className="checkLabel"
                        >
                            {input.label}
                            <input type={input.type} className="input mt-2" />
                        </label>
                    ))}
                </div>
                <div className="padding-y flex w-full flex-col xl:w-1/2 xl:py-0 xl:pb-24">
                    <h1 className="flex-center mb-10 justify-start text-xl  font-medium xl:-mt-10 xl:ml-auto">
                        <FaCartShopping />
                        Cart
                    </h1>

                    {show
                        ? cartItems?.map((item, index) => (
                              <div
                                  key={index}
                                  className="flex-center mb-3 border-b border-black/10 pb-3 "
                              >
                                  <img
                                      src={
                                          baseUrl +
                                          item.image
                                              .replace("public", "")
                                              .replaceAll("\\", "/")
                                      }
                                      alt=""
                                      className="h-14 w-14"
                                  />
                                  <p>
                                      {item.name} ({item.quantity})
                                  </p>
                                  <p className="ml-auto">
                                      {formatNumber.format(
                                          item.quantity * item.price,
                                      )}
                                  </p>
                              </div>
                          ))
                        : slice?.map((item, index) => (
                              <div
                                  key={index}
                                  className="flex-center mb-3 border-b border-black/10 pb-3"
                              >
                                  <img
                                      src={
                                          baseUrl +
                                          item.image
                                              .replace("public", "")
                                              .replaceAll("\\", "/")
                                      }
                                      alt=""
                                      className="h-14 w-14"
                                  />
                                  <p>
                                      {item.name} ({item.quantity})
                                  </p>
                                  <p className="ml-auto">
                                      {formatNumber.format(
                                          item.quantity * item.price,
                                      )}
                                  </p>
                              </div>
                          ))}

                    {cartItems?.length > 5 && (
                        <button
                            onClick={() => setShow(!show)}
                            className="button my-5 w-1/2 rounded-md"
                        >
                            {!show
                                ? "Show More"
                                : showVal > 1
                                ? "Hide Products"
                                : "Hide Product"}{" "}
                            ({showVal})
                        </button>
                    )}

                    <p className="flex-between mb-4 mt-10 border-b border-black/30 pb-4">
                        Subtotal:{" "}
                        <span>{formatNumber.format(totalAmount)}</span>
                    </p>
                    <p className="flex-between mb-4 border-b border-black/30 pb-4">
                        Shipping: <span>Free</span>
                    </p>
                    <p className="flex-between mb-4 pb-4">
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
                        <div className="flex-center -mt-1 ml-auto h-10">
                            <img src={visa} alt="visa" className="h-5 w-14" />
                            <img
                                src={masterCard}
                                alt="master card"
                                className="h-8 w-14"
                            />
                        </div>
                    </div>
                    <div className="flex-center mt-10">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="input w-3/5"
                        />
                        <button className="button w-2/5">Apply Coupon</button>
                    </div>
                    <button className="button mx-0 mt-10 xl:w-2/5">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
