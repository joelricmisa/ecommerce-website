import React from "react";
import { Link } from "react-router-dom";

const NewArrivalCardText = ({ title, description }) => {
  return (
    <span className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end gap-2 bg-secondary/30 p-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="w-1/2 text-sm">{description}</p>
      <Link className="link" to={"/products"}>
        Shop Now
      </Link>
    </span>
  );
};

export default NewArrivalCardText;
