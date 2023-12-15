import React, { useEffect, useState } from "react";

const CheckoutProductCard = (props) => {
    const { _id, name, image, price, discount, isShow } = props;

    const getProductQuantity = () => {
        const itemsQty = JSON.parse(localStorage.getItem("productQty"));

        const productQty = itemsQty?.filter((item) => {
            return item.id === _id;
        });

        const result = productQty?.[0]?.quantity;
        return result ? result : 1;
    };

    const [quantity, setQuantity] = useState(getProductQuantity());
    const itemPrice =
        quantity * (Number(price) - Number(price) * (discount / 100));

    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = `${baseUrl}${image
        .replace("public", "")
        .replaceAll("\\", "/")}`;

    const formatNumber = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });

    useEffect(() => {
        let productsQty = JSON.parse(localStorage.getItem("productQty"));

        productsQty === null ? (productsQty = []) : null;

        const productIndex = productsQty?.findIndex((item) => {
            return item.id === _id;
        });

        if (productIndex !== -1) {
            productsQty?.splice(productIndex, 1, {
                id: _id,
                quantity: quantity,
            });
        } else {
            productsQty.push({
                id: _id,
                quantity: quantity,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));
    }, [quantity]);

    return (
        <div
            className={`${isShow ? "flex-center" : "hidden"}
         mb-3 border-b border-black/10 pb-3`}
        >
            <img src={imageSource} alt="" className="h-14 w-14" />
            <p>
                {name} ({quantity})
            </p>
            <p className="ml-auto">{formatNumber.format(itemPrice)}</p>
        </div>
    );
};

export default CheckoutProductCard;
