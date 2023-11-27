import React from "react";

const SkeletonCategory = () => {
    return (
        <span className="flex h-9 items-center rounded-sm bg-secondary bg-opacity-20 px-3">
            <span className="block h-5 w-16 animate-pulse rounded-sm bg-extraColor"></span>
        </span>
    );
};

export default SkeletonCategory;
