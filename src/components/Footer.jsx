import { Link } from "react-router-dom";
import {
    appStore,
    playStore,
    facebook,
    instagram,
    twitter,
    linkedIn,
} from "../assets/logo";
import { githubQr } from "../assets/icons";
import { footerLinks } from "../constants";
import { FaRegCopyright, FaRegPaperPlane } from "react-icons/fa6";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-secondary text-primary">
            <div className="padding grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {footerLinks.map((section, index) => (
                    <ul key={section.title} className="footerLinkParent">
                        <li>
                            <Link className="footerLinkHeader">
                                {section.title}
                            </Link>
                        </li>

                        {section.links.map((link) => (
                            <li key={link.label}>
                                <Link className="footerLink">{link.label}</Link>
                            </li>
                        ))}

                        {index == 0 ? (
                            <li>
                                <label
                                    htmlFor="email"
                                    className="relative block"
                                >
                                    <span className="sr-only">Email</span>
                                    <input
                                        className="input rounded-md border border-slate-300 bg-secondary px-4 py-2 pr-9 placeholder:text-sm"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="button"
                                        className="flex-center absolute inset-y-0 right-0 pr-2"
                                    >
                                        <FaRegPaperPlane />
                                    </button>
                                </label>
                            </li>
                        ) : (
                            ""
                        )}

                        {index == 4 ? (
                            <>
                                <li className="flex">
                                    <img
                                        src={githubQr}
                                        className="w-1/2"
                                        alt="my github qr code"
                                    />
                                    <span className="flex-center ml-4 w-1/2 flex-col">
                                        <img
                                            src={playStore}
                                            className="cursor-pointer"
                                            alt="playstore"
                                        />
                                        <img
                                            src={appStore}
                                            className="cursor-pointer"
                                            alt="appstore"
                                        />
                                    </span>
                                </li>
                                <li className="flex-center justify-start">
                                    <img
                                        src={facebook}
                                        className="cursor-pointer"
                                        alt="facebook icon"
                                    />
                                    <img
                                        src={twitter}
                                        className="cursor-pointer"
                                        alt="twitter icon"
                                    />
                                    <img
                                        src={instagram}
                                        className="cursor-pointer"
                                        alt="instagram icon"
                                    />
                                    <img
                                        src={linkedIn}
                                        className="cursor-pointer"
                                        alt="linkedin icon"
                                    />
                                </li>
                            </>
                        ) : (
                            ""
                        )}
                    </ul>
                ))}
            </div>
            <div className="flex-center flex-wrap gap-2 border-t p-5 text-center opacity-40">
                <FaRegCopyright />{" "}
                <h2>Copyright Joelric {currentYear}. All right reserved</h2>
            </div>
        </footer>
    );
};

export default Footer;
