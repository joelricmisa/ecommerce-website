import { ProductCard } from "./index";
import { timerImg } from "../assets/images";
import { v4 as uuid } from "uuid";
import { SvgIcon } from "./index";
import { arrowLeft, arrowRight } from "../assets/icons/SvgIconsList";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const ProductList = ({
  data,
  category,
  title,
  timer,
  headerBtn,
  bottomBtn,
}) => {
  const { setCategory } = useContext(ShopContext);
  return (
    <div className="padding border-bottom mt-10 flex w-full flex-col gap-8 lg:mt-0 ">
      <div
        className=" flex-center h-10 w-full !justify-start font-semibold  text-tertiary-100 
			"
      >
        <span className="h-10 w-5 rounded-sm bg-tertiary-100"></span>
        {category}
      </div>

      <div className="flex-center w-full flex-col items-start gap-2 ">
        {timer && <Timer days={3} hours={12} minutes={30} seconds={15} />}

        <div className={`${timer && "mt-5"} flex-between w-full `}>
          <span
            className={`font-inter text-2xl font-semibold sm:text-3xl lg:text-4xl`}
          >
            {title}{" "}
          </span>
          {headerBtn ? (
            <Link
              to={"/products"}
              className="button mx-0 ml-auto "
              onClick={() => setCategory(title)}
            >
              View All
            </Link>
          ) : (
            <span className="flex-center ">
              <SvgIcon icon={arrowLeft()} classVal={"icon"} />
              <SvgIcon icon={arrowRight()} classVal={"icon"} />
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
        {data.map((product) => {
          // console.log(product);
          return (
            <ProductCard
              key={uuid()}
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
      </div>
      {bottomBtn && (
        <Link
          to={"/products"}
          className="button mt-16 xl:px-20 "
          onClick={() => {
            title === "Flash Sales" ? setCategory(title) : setCategory("all");
          }}
        >
          View All Products
        </Link>
      )}
    </div>
  );
};

export default ProductList;
