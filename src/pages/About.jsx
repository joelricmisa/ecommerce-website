import React from "react";
import { Link, useLocation } from "react-router-dom";
import { aboutCover } from "../assets/images";
import { ServiceCard, ShopInfoCard } from "../components";
import { shopInfo, services, people } from "../constants";
import PeopleCard from "../components/PeopleCard";

const About = () => {
	const location = useLocation();
	let currentLink = "";
	const crumbs = location.pathname.split("/").filter((link) => link !== "");

	return (
		<div className="w-11/12  ml-auto py-20">
			<p className="font-poppins -ml-2 mb-14">
				<Link to="/" className="opacity-50 ">
					Home /
				</Link>
				{crumbs.map((link) => {
					currentLink += `/${link}`;
					return (
						<Link key={link} to={currentLink} className="capitalize ml-2 after:conter-['/'] after:ml-2 after:last:content-['']">
							{link}
						</Link>
					);
				})}
			</p>
			<div className="flex">
				<div className="flex flex-col items-start justify-center font-poppins pr-20">
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
				<img src={aboutCover} alt="" />
			</div>
			<div className="flex gap-8 my-32 w-11/12">
				{shopInfo.map((info, index) => (
					<ShopInfoCard key={index} iconVal={info.shopInfoIcon} numbers={info.shopInfoNumber} description={info.shopInfoDescription} />
				))}
			</div>
			<div className="flex gap-8 mt-32 mb-16 w-11/12">
				{people.map((person, index) => (
					<PeopleCard key={index} personName={person.personName} personImg={person.personImg} personPosition={person.position} />
				))}
			</div>
			<div className="flex w-11/12  gap-10 justify-center">
				{services.map((service, index) => (
					<ServiceCard key={index} serviceImg={service.serviceImg} serviceTitle={service.serviceTitle} serviceDescription={service.serviceDescription} />
				))}
			</div>
		</div>
	);
};

export default About;
