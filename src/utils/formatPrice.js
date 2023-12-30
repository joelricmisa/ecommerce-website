const formatPrice = (price) => {
    const currency = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    return currency.format(price);
};

export default formatPrice;
