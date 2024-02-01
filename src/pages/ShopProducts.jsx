import React, { useContext, useEffect, useRef, useState } from "react";
import {
    ProductCard,
    Breadcrumb,
    SkeletonCard,
    SkeletonCategory,
} from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { motion, useAnimate } from "framer-motion";
import { FaAngleLeft, FaAngleRight, FaInbox, FaSpinner } from "react-icons/fa6";
import axios, { axiosPrivate } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useCategory } from "../hooks";

const ShopProducts = () => {
    const { category } = useCategory();
    const [products, setProducts] = useState();
    const [currentCategory, setCurrentCategory] = useState(category);
    const ref = useRef();
    const [scope, animate] = useAnimate();
    const dummyArr = [1, 2, 3, 4, 1, 2, 3, 4];
    const dummyArrCategory = [1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4];

    const { data: productsStorage, isLoading: isProdcutLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/api/products");
            //console.log(response);
            const responseData = response?.data?.data?.products;

            const filtered = responseData?.filter((item) => {
                return item.categories?.some(
                    (category) => category?.name == currentCategory,
                );
            });

            currentCategory === "all"
                ? setProducts(responseData)
                : setProducts(filtered);

            // setProducts(response?.data?.data);
            return responseData;
        },
    });

    const { data: categories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosPrivate.get("/api/categories");
            const responseData = response?.data?.data?.categories;

            return responseData;
        },
    });

    useEffect(() => {
        const filtered = productsStorage?.filter((item) => {
            return item.categories?.some(
                (category) => category?.name == currentCategory,
            );
        });

        currentCategory === "all"
            ? setProducts(productsStorage)
            : setProducts(filtered);
    }, [currentCategory]);

    const variant = {
        initial: { opacity: 0, y: 100 },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 * index },
        }),
    };

    return (
        <div className="padding animate">
            <Breadcrumb padding="" />

            <div className="relative mx-auto w-10/12 sm:w-11/12 lg:w-full ">
                <button
                    type="button"
                    className="button absolute -left-10 top-3 px-0"
                    onClick={() => {
                        ref.current.scrollLeft -= 200;
                    }}
                >
                    <FaAngleLeft />
                </button>

                <div
                    ref={ref}
                    className="flex-center my-10 snap-x justify-start gap-5 overflow-x-hidden border-y border-black/10 py-5"
                >
                    <button
                        className={`categoryBtn h-[35px] snap-start ${
                            currentCategory === "all"
                                ? ""
                                : "bg-primary text-secondary hover:text-primary"
                        }`}
                        onClick={() => setCurrentCategory("all")}
                    >
                        All
                    </button>

                    {isCategoryLoading
                        ? dummyArrCategory.map((val, index) => {
                              return (
                                  <motion.div
                                      variants={variant}
                                      initial="initial"
                                      animate="animate"
                                      custom={index}
                                      key={index}
                                  >
                                      <SkeletonCategory />
                                  </motion.div>
                              );
                          })
                        : categories?.map((link) => (
                              <button
                                  key={link.name}
                                  className={`categoryBtn h-[35px]  snap-start whitespace-nowrap ${
                                      currentCategory === link.name
                                          ? ""
                                          : "bg-primary text-secondary hover:text-primary"
                                  }`}
                                  onClick={() => setCurrentCategory(link.name)}
                              >
                                  {link.name}
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
                    <FaAngleRight />
                </button>
            </div>

            <div
                ref={scope}
                className="padding-b grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 "
            >
                {isProdcutLoading
                    ? dummyArr.map((val, index) => {
                          return (
                              <motion.div
                                  variants={variant}
                                  initial="initial"
                                  animate="animate"
                                  custom={index}
                                  key={index}
                              >
                                  <SkeletonCard />
                              </motion.div>
                          );
                      })
                    : products?.map((product, index) => {
                          // console.log(product);
                          return (
                              <motion.div
                                  variants={variant}
                                  initial="initial"
                                  animate="animate"
                                  custom={index}
                                  key={index}
                              >
                                  <ProductCard
                                      {...product}
                                      controlWidth={false}
                                  />
                              </motion.div>
                          );
                      })}
                {products?.length === 0 && (
                    <div className="flex-center col-span-12 py-16 text-2xl">
                        <FaInbox className="text-3xl" /> No Available Product
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopProducts;
