import React from "react";
import { socials } from "../constants";

const PeopleCard = ({ personImg, personName, personPosition }) => {
	return (
		<div className="flex flex-col w-[370px] rounded-sm shadow-md">
			<div className="bg-gray-100 flex justify-center pt-10">
				<img src={personImg} alt="" />
			</div>
			<div className="p-5 ">
				<p className="text-3xl font-medium font-inter">{personName}</p>
				<p className="font-poppins font-base mt-2 mb-3">{personPosition}</p>
				<div
					className="flex gap-4 items-center
                ">
					{socials.map((social) => (
						<a key={social} href="#">
							<img src={social.icon} alt={social.name} />
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default PeopleCard;
