import { ServiceCard } from "../../components";
import { services } from "../../constants";
const Services = () => {
  return (
    <div className="flex-center padding w-full flex-col flex-wrap gap-0 !pt-0 sm:flex-row sm:gap-5 xl:gap-10 ">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          serviceImg={service.serviceImg}
          serviceTitle={service.serviceTitle}
          serviceDescription={service.serviceDescription}
        />
      ))}
    </div>
  );
};

export default Services;
