import { ProductCard, WishlistCard } from "../components";
import { v4 as uuid } from "uuid";
import { FaHeart, FaInbox } from "react-icons/fa6";
import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useWishlist } from "../hooks";

const Wishlist = () => {
    //
    //Wishlist components
    const WishlistCount = () => {
        const { wishlistItems } = useWishlist();

        return (
            <span className="flex gap-2 text-xl text-black">
                <FaHeart className="text-2xl text-tertiary-100" /> Wishlist (
                {wishlistItems?.length})
            </span>
        );
    };

    const WishlistContent = () => {
        const { wishlistItems } = useWishlist();

        return (
            <>
                {wishlistItems?.length !== 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
                        {wishlistItems?.map((product) => {
                            return <WishlistCard key={uuid()} {...product} />;
                        })}
                    </div>
                ) : (
                    <p className="flex-center text-center">
                        <FaInbox className="text-3xl" /> Your wishlist is empty.
                    </p>
                )}
            </>
        );
    };

    const RecommendationBox = () => {
        const flashSalesId = "6554b1bfdb069acd41999b0d";

        const { wishlistItems } = useWishlist();

        const { data, isError, error, isLoading } = useQuery({
            queryKey: ["category", flashSalesId],
            queryFn: async () => {
                const response = await axios.get(
                    `/api/categories/${flashSalesId}`,
                );
                //console.log(response);
                const responseData = response?.data?.data?.products;
                return responseData;
            },
        });
        return (
            <>
                {isError ? null : data?.filter((product) => {
                      return !wishlistItems?.some((item) => {
                          return item._id === product._id;
                      });
                  })?.length > 0 ? (
                    <div className="padding flex flex-col ">
                        <div className="flex-center mb-20 w-full justify-start font-semibold text-tertiary-100">
                            <span className="h-10 w-5 rounded-sm bg-tertiary-100"></span>
                            Just For You
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 ">
                            {isLoading ? (
                                <span className="mx-auto flex items-center gap-2">
                                    <FaSpinner className="animate-spin" />
                                    Loading...
                                </span>
                            ) : (
                                data.reduce((products, product) => {
                                    if (
                                        !wishlistItems.some(
                                            (item) => item._id === product._id,
                                        )
                                    ) {
                                        products.push(
                                            <ProductCard
                                                key={uuid()}
                                                {...product}
                                            />,
                                        );
                                    }
                                    return products;
                                }, [])
                            )}
                        </div>
                    </div>
                ) : null}
            </>
        );
    };

    return (
        <section className="animate">
            <div className="padding border-bottom flex flex-col ">
                <div className="flex-center xl:flex-between mb-20 h-10 flex-wrap font-semibold text-tertiary-100 ">
                    <WishlistCount />
                    {/* <AddAll /> */}
                </div>

                <WishlistContent />
            </div>
            <RecommendationBox />
        </section>
    );
};

export default Wishlist;
