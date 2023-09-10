import { SvgIcon, WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { ProductData } from "../constants";
import { trash, eye, box } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, addToCart } = useContext(ShopContext);
  const [addAll, setAddAll] = useState(false);

  useEffect(() => {
    addAll && wishlistItems.map((product) => addToCart(product));
  }, [addAll, addToCart]);

  return (
    <section className="animate">
      <div className="padding border-bottom flex flex-col ">
        <div className="flex-center xl:flex-between mb-20 h-10 flex-wrap font-semibold text-tertiary-100 ">
          <span className="text-xl text-black">
            Wishlist ({wishlistItems.length})
          </span>
          <button
            type="button"
            className="button mx-0"
            onClick={() => setAddAll(!addAll)}
          >
            Move All To Cart
          </button>
        </div>
        {wishlistItems.length !== 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
            {wishlistItems.map((product) => {
              return (
                <WishlistCard
                  key={uuid()}
                  id={product.id}
                  productName={product.productName}
                  productImage={product.productImage}
                  currentPrice={product.currentPrice}
                  originalPrice={product.originalPrice}
                  discountPercentage={product.discountPercentage}
                  iconValue={trash("text-white fill-tertiary-200 ")}
                  iconName={"trash"}
                  quantity={product.quantity}
                  subTotal={product.subTotal}
                />
              );
            })}
          </div>
        ) : (
          <p className="flex-center text-center">
            <SvgIcon icon={box("w-10 h-10")} /> Your wishlist is empty.
          </p>
        )}
      </div>

      <div className="padding flex flex-col ">
        <div className="flex-between mb-20 font-semibold text-tertiary-100">
          <div className="flex-center">
            <span className="h-10 w-5 rounded-sm bg-tertiary-100"></span>
            Just For You
          </div>
          <Link to={"/products"} className="button mx-0">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
          {ProductData.flashSales.map((product) => {
            return (
              <WishlistCard
                key={uuid()}
                id={product.id}
                productName={product.productName}
                productImage={product.productImage}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                rating={product.rating}
                rateCount={product.rateCount}
                discountPercentage={product.discountPercentage}
                iconValue={eye("text-white fill-tertiary-200 ")}
                iconName={"eye"}
                quantity={product.quantity}
                subTotal={product.subTotal}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
