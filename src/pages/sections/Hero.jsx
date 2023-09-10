import { sideLinks } from "../../constants";
import { Link } from "react-router-dom";
import { apple } from "../../assets/logo";
import { heroImg } from "../../assets/images";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
const Hero = () => {
    const { setCategory } = useContext(ShopContext);
    return (
        <div className="flex w-full flex-wrap">
            <ul className="flex-center padding w-full flex-wrap justify-start gap-5  lg:w-3/12 lg:flex-col lg:items-start lg:border-r">
                {sideLinks.map((link) => (
                    <li key={link.label}>
                        <Link
                            className="link font-normal lg:no-underline"
                            to={"/products"}
                            onClick={() => setCategory(link.category)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="w-full lg:w-9/12 lg:p-10 ">
                <section className=" h-full w-full grid-cols-2 grid-rows-2  rounded-sm bg-secondary text-primary lg:h-[400px]">
                    <div className="flex h-full w-full p-5 xl:p-10">
                        <div className="flex-center mx-auto flex-col items-start gap-5 lg:pl-20 lg:pt-10 ">
                            <p className="flex items-center">
                                <span>
                                    <img src={apple} className="mr-4" alt="" />
                                </span>
                                iPhone 14 Series
                            </p>
                            <h1 className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
                                Up to 10% <br /> off Voucher
                            </h1>
                            <Link className="link block">Shop Now</Link>
                        </div>
                        <img
                            src={heroImg}
                            className="w-1/2 scale-75 lg:scale-100"
                            alt=""
                        />
                    </div>

                    <ul className="flex-center w-full gap-2 bg-secondary pb-5">
                        <li className="heroBullet"></li>
                        <li className="heroBullet"></li>
                        <li className="h-4 w-4 cursor-pointer rounded-full bg-secondary ring-2 ring-primary "></li>
                        <li className="heroBullet"></li>
                        <li className="heroBullet"></li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Hero;
