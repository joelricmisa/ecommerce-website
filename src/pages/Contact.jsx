import { Breadcrumb, SvgIcon } from "../components/index";
import { mail, phone } from "../assets/icons/SvgIconsList";

const Contact = () => {
	return (
		<div className=" w-full padding  !py-0 mb-20 animate">
			<Breadcrumb />
			<div className="flex flex-col gap-10 xl:flex-row">
				<div className="px-8 py-10 text-sm shadow-md xl:w-4/12">
					<div className="flex flex-col gap-4 pb-10 pr-10 border-b border-black/10 xl:pl-5">
						<span className="justify-start font-medium flex-center">
							<SvgIcon
								icon={mail()}
								classVal={"text-white"}
							/>
							<h1>Call To Us</h1>
						</span>
						<p>We are available 24/7, 7 days a week.</p>
						<p>Phone: +632-8888-1227</p>
					</div>
					<div className="flex flex-col gap-4 pt-10 pr-10 xl:pl-5">
						<span className="justify-start font-medium flex-center">
							<SvgIcon
								icon={phone()}
								classVal={"text-white"}
							/>
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
				<div className="flex flex-col px-8 py-10 shadow-md xl:w-8/12">
					<h1 className="mb-10 text-2xl font-medium text-center font-inter">Start a conversation.</h1>
					<div className="flex flex-col gap-2 xl:flex-row">
						<input
							type="text"
							className="input"
							placeholder="Your Name *"
						/>
						<input
							type="email"
							className="input"
							placeholder="Your Email *"
						/>
						<input
							type="number"
							min="0"
							className="input"
							placeholder="Your Phone *"
						/>
					</div>
					<textarea
						type=""
						className="w-full h-full mt-2 mb-5 input xl:my-4"
						placeholder="Your Message"
					/>
					<button className="button xl:w-2/5">Send Message</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
