import React from "react";

import { formatPrice, getImage } from "../utils";

const CheckoutProductCard = (props) => {
    const { isShow, quantity, product_id } = props;

    const itemPrice = quantity * product_id.price;

    const imageSource = getImage(product_id?.image);

    return (
        <div
            className={`${isShow ? "flex-center" : "hidden"}
         mb-3 border-b border-black/10 pb-3`}
        >
            <img
                src={imageSource}
                alt=""
                className="h-14 w-14 object-contain"
            />
            <p>
                {product_id.name} ({quantity})
            </p>
            <p className="ml-auto">{formatPrice(itemPrice)}</p>
        </div>
    );
};

export default CheckoutProductCard;
