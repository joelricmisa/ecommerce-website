import React from "react";

const CheckoutProductCard = (props) => {
    const { isShow, quantity, product_id } = props;

    const itemPrice = quantity * product_id.price;

    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = `${baseUrl}${product_id.image
        .replace("public", "")
        .replaceAll("\\", "/")}`;

    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    return (
        <div
            className={`${isShow ? "flex-center" : "hidden"}
         mb-3 border-b border-black/10 pb-3`}
        >
            <img src={imageSource} alt="" className="h-14 w-14" />
            <p>
                {product_id.name} ({quantity})
            </p>
            <p className="ml-auto">{formatNumber.format(itemPrice)}</p>
        </div>
    );
};

export default CheckoutProductCard;
