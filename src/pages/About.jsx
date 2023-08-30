import { aboutCover } from "../assets/images";
import { Breadcrumb, ServiceCard, ShopInfoCard } from "../components";
import { shopInfo, services, people } from "../constants";
import PeopleCard from "../components/PeopleCard";

const About = () => {
	return (
		<div className="w-full padding-x animate">
			<Breadcrumb />
			<div className="flex-center padding-b flex-col xl:flex-row gap-10">
				<div className="flex-center flex-col items-start xl:pr-20">
					<h1 className="text-5xl mb-10 font-inter">Our Story</h1>
					<p className="mb-6">
						Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Philippines. Supported by wide range of
						tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
					</p>
					<p>
						Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from
						consumer.
					</p>
				</div>
				<img src={aboutCover} className="object-contain" alt="" />
			</div>
			<div className="grid sm:grid-cols-2 xl:grid-cols-4  gap-8  w-full padding-y">
				{shopInfo.map((info) => (
					<ShopInfoCard key={info.label} iconVal={info.shopInfoIcon} numbers={info.shopInfoNumber} description={info.shopInfoDescription} />
				))}
			</div>
			<div className="flex-center flex-col xl:flex-row  w-full padding-y  gap-10">
				{people.map((person) => (
					<PeopleCard key={person.personName} personName={person.personName} personImg={person.personImg} personPosition={person.position} />
				))}
			</div>
			<div className="flex-center flex-col xl:flex-row  w-full padding-b  gap-10 ">
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
