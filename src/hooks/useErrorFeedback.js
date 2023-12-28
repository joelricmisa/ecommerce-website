import useFeedback from "./useFeedback";

const useErrorFeedback = () => {
    const showFeedback = useFeedback();

    const showErrorFeedback = (errCode, responseData) => {
        if (errCode === "ERR_NETWORK") {
            showFeedback(
                "error",
                `Something went wrong with your network connection. Please try again once your connection is stable.`,
                "modal",
            );
        }

        if (errCode === "ERR_BAD_REQUEST") {
            showFeedback("error", `${responseData}`, "modal");
        }

        if (errCode === "ERR_BAD_RESPONSE") {
            showFeedback(
                "error",
                `Our server is experiencing an issue. You may try again later, once we have resolved our server issue.`,
                "modal",
            );
        }
    };
    return showErrorFeedback;
};
export default useErrorFeedback;
