import React from "react";
import { socials } from "../constants";

const PeopleCard = ({ personImg, personName, personPosition }) => {
	return (
		<div className="flex flex-col w-full rounded-sm shadow-md">
			<div className="pt-10 bg-extraColor flex-center ">
				<img
					src={personImg}
					alt=""
				/>
			</div>
			<div className="p-5 ">
				<p className="text-3xl font-medium font-inter">{personName}</p>
				<p className="mt-2 mb-3 text-base">{personPosition}</p>
				<div className="justify-start flex-center">
					{socials.map((social, index) => (
						<a
							key={index}
							href="#">
							<img
								src={social.icon}
								alt={social.name}
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default PeopleCard;
