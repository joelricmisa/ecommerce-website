import React from "react";
import { socials } from "../constants";

const PeopleCard = ({ personImg, personName, personPosition }) => {
  return (
    <div className="flex w-full flex-col rounded-sm shadow-md">
      <div className="flex-center bg-extraColor pt-10 ">
        <img src={personImg} alt="" />
      </div>
      <div className="p-5 ">
        <p className="font-inter text-3xl font-medium">{personName}</p>
        <p className="mb-3 mt-2 text-base">{personPosition}</p>
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
