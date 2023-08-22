import { customerService, delivery, moneyGuarantee } from "../../assets/icons";
const Services = () => {
	return (
		<div className="grid w-8/12 mx-auto grid-cols-3 py-20 pb-40 gap-10">
			<div className="flex flex-col justify-center items-center space-y-2">
				<img src={delivery} className="mb-4" alt="" />
				<h2 className="font-bold text-xl">FREE AND FAST DELIVERY</h2>
				<p className="text-sm">Free delivery for all orders over $140</p>
			</div>
			<div className="flex flex-col justify-center items-center space-y-2">
				<img src={customerService} className="mb-4" alt="" />
				<h2 className="font-bold text-xl">24/7 CUSTOMER SERVICE</h2>
				<p className="text-sm">Friendly 24/7 customer support</p>
			</div>
			<div className="flex flex-col justify-center items-center space-y-2">
				<img src={moneyGuarantee} className="mb-4" alt="" />
				<h2 className="font-bold text-xl">MONEY BACK GUARANTEE</h2>
				<p className="text-sm">We reurn money within 30 days</p>
			</div>
		</div>
	);
};

export default Services;
