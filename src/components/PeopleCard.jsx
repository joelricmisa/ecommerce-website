import React from "react";
import { socials } from "../constants";

const PeopleCard = ({ personImg, personName, personPosition }) => {
	return (
		<div className="flex flex-col w-[370px] rounded-sm shadow-md">
			<div className="bg-gray-100 flex-center pt-10">
				<img src={personImg} alt="" />
			</div>
			<div className="p-5 ">
				<p className="text-3xl font-medium font-inter">{personName}</p>
				<p className="text-base mt-2 mb-3">{personPosition}</p>
				<div className="flex-center justify-start">
					{socials.map((social, index) => (
						<a key={index} href="#">
							<img src={social.icon} alt={social.name} />
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default PeopleCard;
