import React from "react";
import { Breadcrumb, SvgIcon } from "../components/index";
import { mail, phone } from "../assets/icons/SvgIconsList";
const Contact = () => {
	return (
		<div className="w-11/12 ml-auto  py-20 mb-10">
			<Breadcrumb />
			<div className="flex gap-10 pr-10">
				<div className="w-4/12 h-[450px] shadow-md px-8 py-10 font-poppins text-sm">
					<div className="flex flex-col gap-4 pb-10 border-b border-black/10 pr-10 pl-5">
						<span className="flex items-center gap-5 font-medium text-base">
							<SvgIcon icon={mail()} classVal={"text-white"} />
							<h1>Call To Us</h1>
						</span>
						<p>We are available 24/7, 7 days a week.</p>
						<p>Phone: +8801611112222</p>
					</div>
					<div className="flex flex-col gap-4 pt-10 pr-10 pl-5">
						<span className="flex items-center gap-5 font-medium text-base">
							<SvgIcon icon={phone()} classVal={"text-white"} />
							<h1>Write To US</h1>
						</span>
						<p>Fill out our form and we will contact you within 24 hours.</p>
						<p className="flex gap-3 leading-6">
							Emails:
							<span>
								customer@exclusive.com <br />
								support@exclusive.com
							</span>
						</p>
					</div>
				</div>
				<div className="w-8/12 h-[450px] shadow-md font-poppins px-8 py-10 flex flex-col">
					<div className="flex gap-2">
						<input type="text" className="input" placeholder="Your Name *" />
						<input type="email" className="input" placeholder="Your Email *" />
						<input type="number" min="0" className="input" placeholder="Your Phone *" />
					</div>
					<textarea type="" className="input w-full h-full  my-8  " placeholder="Your Message" />
					<button className="bg-secondary text-white w-2/5 h-[60px] ml-auto  px-10 py-4 font-medium">Send Message</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
