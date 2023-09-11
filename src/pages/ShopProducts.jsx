import React, { useContext, useEffect, useRef, useState } from "react";
import { productCategories, shopProductsData } from "../constants";
import { ProductCard, Breadcrumb, SvgIcon } from "../components";
import { box, chevronLeft, chevronRight } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
const ShopProducts = () => {
    const { category } = useContext(ShopContext);
    const [products, setProducts] = useState(shopProductsData);
    const [currentCategory, setCurrentCategory] = useState(category);
    const ref = useRef();

    useEffect(() => {
        const filtered = shopProductsData.filter((item) =>
            item.category.includes(currentCategory),
        );
        currentCategory === "all"
            ? setProducts(shopProductsData)
            : setProducts(filtered);
    }, [currentCategory]);

    return (
        <div className="padding animate">
            <Breadcrumb padding="" />

            <div className="relative">
                <button
                    type="button"
                    className="button absolute -left-10 top-3 px-0"
                    onClick={() => {
                        ref.current.scrollLeft -= 200;
                    }}
                >
                    <SvgIcon icon={chevronLeft("w-6 h-6")} />
                </button>

                <div
                    ref={ref}
                    className="flex-center my-10 w-full justify-start gap-5 overflow-x-hidden border-y border-black/10 py-5"
                >
                    <button
                        className={`categoryBtn h-[35px] ${
                            currentCategory === "all"
                                ? ""
                                : "bg-primary text-secondary hover:text-primary"
                        }`}
                        onClick={() => setCurrentCategory("all")}
                    >
                        All
                    </button>

                    {productCategories.map((link) => (
                        <button
                            key={link.label}
                            className={`categoryBtn h-[35px]  whitespace-nowrap ${
                                currentCategory === link.category
                                    ? ""
                                    : "bg-primary text-secondary hover:text-primary"
                            }`}
                            onClick={() => setCurrentCategory(link.category)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className="button absolute -right-10 top-3 px-0"
                    onClick={() => {
                        ref.current.scrollLeft += 200;
                    }}
                >
                    <SvgIcon icon={chevronRight("w-6 h-6")} />
                </button>
            </div>
            <div className="padding-b grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
                {products.map((product, index) => {
                    // console.log(product);
                    return (
                        <ProductCard
                            key={index}
                            id={product.id}
                            productName={product.productName}
                            productImage={product.productImage}
                            currentPrice={product.currentPrice}
                            originalPrice={product.originalPrice}
                            rating={product.rating}
                            rateCount={product.rateCount}
                            discountPercentage={product.discountPercentage}
                            quantity={product.quantity}
                            subTotal={product.subTotal}
                        />
                    );
                })}
                {products.length === 0 ? (
                    <div className="flex-center col-span-12 py-16 text-2xl">
                        <SvgIcon icon={box("w-20 h-20")} /> No Available Product
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ShopProducts;
