import { sideLinks, HeroData } from "../../constants";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import { useCategory } from "../../hooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const Hero = () => {
    const { setCategory } = useCategory();
    const [index, setIndex] = useState(0);

    const currentHero = HeroData[index];

    const checkNumber = (number) => {
        if (number > HeroData.length - 1) {
            return 0;
        }

        if (number < 0) {
            return HeroData.length - 1;
        }

        return number;
    };

    const prevData = () => {
        setIndex(() => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };

    const nextData = () => {
        setIndex(() => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

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
                                        onClick={() => setIndex(index)}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-full w-1/2">
                            <i
                                className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-300 p-3 text-black shadow-md shadow-black outline-1 outline-white"
                                onClick={prevData}
                            >
                                <FaChevronLeft />
                            </i>
                            <img
                                src={currentHero.img}
                                className="h-full w-full object-cover"
                                alt={`${currentHero.title} image`}
                            />
                            <i
                                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-300 p-3 text-black shadow-md shadow-black outline-1 outline-white"
                                onClick={nextData}
                            >
                                <FaChevronRight />
                            </i>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Hero;
