import { createContext, useState } from "react";

const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState("all");
    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
export default CategoryContext;
