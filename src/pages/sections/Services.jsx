import { ServiceCard } from "../../components";
import { services } from "../../constants";
const Services = () => {
	return (
		<div className="flex w-9/12 mx-auto justify-center -mt-10 py-20  gap-20">
			{services.map((service, index) => (
				<ServiceCard key={index} serviceImg={service.serviceImg} serviceTitle={service.serviceTitle} serviceDescription={service.serviceDescription} />
			))}
		</div>
	);
};

export default Services;
