const useNumberFormat = () => {
    const format = new Intl.NumberFormat("fil-PH", {
        currency: "PHP",
        style: "currency",
    });
    return format;
};

export default useNumberFormat;
