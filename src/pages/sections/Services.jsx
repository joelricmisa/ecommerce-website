import { ServiceCard } from "../../components";
import { services } from "../../constants";
const Services = () => {
	return (
		<div className="flex-center flex-col sm:flex-row flex-wrap w-full padding gap-0 sm:gap-5 xl:gap-10 !pt-0 ">
			{services.map((service, index) => (
				<ServiceCard key={index} serviceImg={service.serviceImg} serviceTitle={service.serviceTitle} serviceDescription={service.serviceDescription} />
			))}
		</div>
	);
};

export default Services;
