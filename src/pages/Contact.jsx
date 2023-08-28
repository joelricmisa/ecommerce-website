import React from "react";
import { Breadcrumb, SvgIcon } from "../components/index";
import { mail, phone } from "../assets/icons/SvgIconsList";
const Contact = () => {
	return (
		<div className=" w-full padding  !py-0 mb-20">
			<Breadcrumb />
			<div className="flex  flex-col xl:flex-row gap-10">
				<div className="xl:w-4/12  shadow-md px-8 py-10  text-sm">
					<div className="flex flex-col gap-4 pb-10 border-b border-black/10 pr-10 xl:pl-5">
						<span className="flex-center justify-start font-medium">
							<SvgIcon icon={mail()} classVal={"text-white"} />
							<h1>Call To Us</h1>
						</span>
						<p>We are available 24/7, 7 days a week.</p>
						<p>Phone: +632-8888-1227</p>
					</div>
					<div className="flex flex-col gap-4 pt-10 pr-10 xl:pl-5">
						<span className="flex-center justify-start font-medium">
							<SvgIcon icon={phone()} classVal={"text-white"} />
							<h1>Write To US</h1>
						</span>
						<p>Fill out our form and we will contact you within 24 hours.</p>
						<p className="flex flex-wrap gap-3 leading-6">
							Emails:
							<span>
								customer@exclusive.com <br />
								support@exclusive.com
							</span>
						</p>
					</div>
				</div>
				<div className="xl:w-8/12 shadow-md  px-8 py-10 flex flex-col">
					<h1 className="text-center mb-10 font-medium font-inter text-2xl">Start a conversation.</h1>
					<div className="flex flex-col xl:flex-row gap-2">
						<input type="text" className="input" placeholder="Your Name *" />
						<input type="email" className="input" placeholder="Your Email *" />
						<input type="number" min="0" className="input" placeholder="Your Phone *" />
					</div>
					<textarea type="" className="input w-full h-full mt-2 mb-5 xl:my-4" placeholder="Your Message" />
					<button className="button xl:w-2/5">Send Message</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
