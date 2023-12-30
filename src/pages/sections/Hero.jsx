import { sideLinks, HeroData } from "../../constants";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import { useCategory } from "../../hooks";
const Hero = () => {
    const { setCategory } = useCategory();
    const [currentHero, setCurrentHero] = useState(HeroData[0]);

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
                <section className=" h-[400px] w-full grid-cols-2 grid-rows-2  rounded-sm bg-secondary text-primary">
                    <div className="flex h-full w-full ">
                        <div className="w-1/2 ">
                            <div className="flex-center h-5/6  flex-col items-start gap-5 p-5 sm:p-0  sm:pl-[20%] sm:pt-10">
                                <p className="flex items-center text-2xl">
                                    {currentHero.title}
                                </p>
                                <h1 className="text-2xl font-bold leading-normal md:text-4xl lg:text-5xl">
                                    Up to {currentHero.voucher}% <br />
                                    <span className="mt-3 inline-block">
                                        off Voucher
                                    </span>
                                </h1>
                                <Link to={"/products"} className="link block">
                                    Shop Now
                                </Link>
                            </div>
                            <ul className="flex-center h-1/6 gap-2 bg-secondary">
                                {HeroData.map((item, index) => (
                                    <li
                                        key={index}
                                        className={` ${
                                            currentHero.title === item.title
                                                ? "h-4 w-4 cursor-pointer rounded-full bg-secondary ring-2 ring-primary"
                                                : "heroBullet"
                                        } `}
                                        onClick={() =>
                                            setCurrentHero(HeroData[index])
                                        }
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <img
                            src={currentHero.img}
                            className="h-full w-1/2"
                            alt=""
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Hero;
