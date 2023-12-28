const useGetImage = (imageUrl) => {
    const baseUrl = "https://exclusive-backend-te81.onrender.com";

    const imageSource = ` ${baseUrl}${imageUrl
        ?.replace("public", "")
        ?.replaceAll("\\", "/")}`;

    return imageSource;
};

export default useGetImage;
