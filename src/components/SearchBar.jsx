import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "../api/axios";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);

    const textInputStyle = `input rounded-md border border-slate-300 py-2 pr-9 placeholder:text-sm placeholder:text-slate-400`;

    const iconButtonStyle = `flex-center absolute inset-y-0 right-0 p-2 pr-4`;

    const searchResultBoxStyle = `absolute top-[100%] z-50 w-full rounded-md bg-extraColor xl:w-11/12`;

    const searchResultLinkStyle = `flex-between h-10 w-full p-2 pr-4
            hover:bg-secondary/10`;

    const getSearchInput = async () => {
        const response = await axios.get("/api/products");
        const filtered = response.data?.data.filter((product) =>
            product.name.toLowerCase().includes(searchInput.toLowerCase()),
        );

        filtered?.length !== 0
            ? setSearchResult(filtered)
            : setSearchResult([]);
    };

    useEffect(() => {
        getSearchInput();
    }, [searchInput]);

    return (
        <>
            <label
                htmlFor="search"
                className="relative block w-full xl:w-11/12 "
            >
                <span className="sr-only">Search</span>

                <input
                    className={textInputStyle}
                    placeholder="What are you looking for?"
                    type="text"
                    name="search"
                    autoComplete="off"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setSearchFocus(false);
                            setSearchInput("");
                        }, 150)
                    }
                />

                <button type="button" className={iconButtonStyle}>
                    <FaMagnifyingGlass />
                </button>
            </label>

            {/* display when user touch and input in search bar  */}
            {searchInput && searchFocus && (
                <div className={searchResultBoxStyle}>
                    {searchResult?.length === 0 ? (
                        <span className={searchResultLinkStyle}>
                            No results found <FaMagnifyingGlass />
                        </span>
                    ) : (
                        <ul className="max-h-[400px] overflow-auto rounded-md">
                            {searchResult.map((item, index) => (
                                <Link
                                    key={index}
                                    className={searchResultLinkStyle}
                                    to={`/products/${item._id}`}
                                    onClick={() => {
                                        setSearchFocus(false);
                                        setSearchInput("");
                                    }}
                                >
                                    {item.name}
                                    <FaMagnifyingGlass />
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchBar;
