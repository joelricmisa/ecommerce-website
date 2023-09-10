import { aboutCover } from "../assets/images";
import { Breadcrumb, ServiceCard, ShopInfoCard } from "../components";
import { shopInfo, services, people } from "../constants";
import PeopleCard from "../components/PeopleCard";

const About = () => {
  return (
    <div className="padding-x animate w-full">
      <Breadcrumb />
      <div className="flex-center padding-b flex-col gap-10 xl:flex-row">
        <div className="flex-center flex-col items-start xl:pr-20">
          <h1 className="mb-10 font-inter text-5xl">Our Story</h1>
          <p className="mb-6">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Philippines. Supported by
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 millions
            customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <img src={aboutCover} className="object-contain" alt="" />
      </div>
      <div className="padding-y grid w-full gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {shopInfo.map((info) => (
          <ShopInfoCard
            key={info.label}
            iconVal={info.shopInfoIcon}
            numbers={info.shopInfoNumber}
            description={info.shopInfoDescription}
          />
        ))}
      </div>
      <div className="flex-center padding-y w-full flex-col gap-10 xl:flex-row">
        {people.map((person) => (
          <PeopleCard
            key={person.personName}
            personName={person.personName}
            personImg={person.personImg}
            personPosition={person.position}
          />
        ))}
      </div>
      <div className="flex-center padding-b w-full flex-col gap-10 xl:flex-row ">
        {services.map((service) => (
          <ServiceCard
            key={service.serviceTitle}
            serviceImg={service.serviceImg}
            serviceTitle={service.serviceTitle}
            serviceDescription={service.serviceDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
