import { SvgIcon, WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { ProductData } from "../constants";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInbox, FaRegEye, FaTrashCan } from "react-icons/fa6";
import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";

const Wishlist = () => {
    const { wishlistItems, addToCart } = useContext(ShopContext);
    const [addAll, setAddAll] = useState(false);
    const flashSalesId = "6554b1bfdb069acd41999b0d";

    useEffect(() => {
        addAll && wishlistItems.map((product) => addToCart(product));
    }, [addAll, addToCart]);

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["category", flashSalesId],
        queryFn: async () => {
            const response = await axios.get(`/api/categories/${flashSalesId}`);
            console.log(response);
            return response?.data?.data?.products;
        },
    });

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
                                    {...product}
                                    iconName={"trash"}
                                    iconValue={
                                        <FaTrashCan className="hover:fill-tertiary-100" />
                                    }
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="flex-center text-center">
                        <FaInbox className="text-3xl" /> Your wishlist is empty.
                    </p>
                )}
            </div>

            {isError ? null : (
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
                        {isLoading ? (
                            <span className="mx-auto inline-block">
                                Loading...
                            </span>
                        ) : (
                            data.map((product) => {
                                return (
                                    <WishlistCard
                                        key={uuid()}
                                        {...product}
                                        iconValue={
                                            <FaRegEye className="hover:fill-tertiary-100" />
                                        }
                                        iconName={"eye"}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Wishlist;
