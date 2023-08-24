import { Link } from "react-router-dom";
import { appStore, playStore, facebook, instagram, twitter, linkedIn } from "../assets/logo";
import { githubQr } from "../assets/icons";
import { footerLinks } from "../constants";
import { SvgIcon } from "./index";
import { send, copyRight } from "../assets/icons/SvgIconsList";
const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-black text-white">
			<div className=" p-32 grid grid-cols-5">
				{footerLinks.map((section, index) => (
					<ul key={section.title} className="footerLinkParent">
						<li>
							<Link className="footerLinkHeader">{section.title}</Link>
						</li>

						{section.links.map((link) => (
							<li key={link.label}>
								<Link className="footerLink">{link.label}</Link>
							</li>
						))}

						{index == 0 ? (
							<li>
								<label htmlFor="email" className="relative block">
									<span className="sr-only">Email</span>
									<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2">
										<SvgIcon icon={send()} />
									</button>
									<input
										className="block placeholder:text-sm bg-black w-full border broder-slate-300 rounded-md py-2 px-4 pr-9 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 font-poppins text-base"
										type="email"
										name="email"
										placeholder="Enter your email"
									/>
								</label>
							</li>
						) : (
							""
						)}

						{index == 4 ? (
							<>
								<li className="flex">
									<img src={githubQr} className="w-1/2" alt="my github qr code" />
									<span className="flex flex-col items-center justify-center space-y-4 ml-4">
										<img src={playStore} className="cursor-pointer" alt="playstore" />
										<img src={appStore} className="cursor-pointer" alt="appstore" />
									</span>
								</li>
								<li className="flex space-x-5 w-full pt-5">
									<img src={facebook} className="cursor-pointer" alt="facebook icon" />
									<img src={twitter} className="cursor-pointer" alt="twitter icon" />
									<img src={instagram} className="cursor-pointer" alt="instagram icon" />
									<img src={linkedIn} className="cursor-pointer" alt="linkedin icon" />
								</li>
							</>
						) : (
							""
						)}
					</ul>
				))}
			</div>
			<div className="flex items-center justify-center space-x-2 font-poppins text-base p-5 border-t opacity-40 ">
				<SvgIcon icon={copyRight()} />

				<h2>Copyright Joelric {currentYear}. All right reserved</h2>
			</div>
		</footer>
	);
};

export default Footer;
