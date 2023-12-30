import { useContext } from "react";
import CategoryContext from "../contexts/CategoryProvider";

const useCategory = () => {
    return useContext(CategoryContext);
};
export default useCategory;
