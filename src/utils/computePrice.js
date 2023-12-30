const computePrice = (price, discount) => {
    const result = Number(price) - Number(price) * (Number(discount) / 100);
    return result;
};

export default computePrice;
