import React, { useContext, useEffect, useState } from "react";
import { productCategories, shopProductsData } from "../constants";
import { ProductCard, Breadcrumb, SvgIcon } from "../components";
import { box } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
const ShopProducts = () => {
  const { category } = useContext(ShopContext);
  const [products, setProducts] = useState(shopProductsData);
  const [currentCategory, setCurrentCategory] = useState(category);
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

      <div className="flex-center my-10 w-full flex-wrap justify-start gap-5 border-y border-black/10 py-5">
        <button
          className={`categoryBtn ${
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
            className={`categoryBtn ${
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
