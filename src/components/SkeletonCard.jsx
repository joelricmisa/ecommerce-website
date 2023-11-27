import React from "react";

const SkeletonCard = () => {
    return (
        <div
            className={`relative h-[300px]  w-auto rounded-sm bg-secondary bg-opacity-20 `}
        >
            <div className="flex flex-1 animate-pulse  justify-between p-5">
                <div className="h-6 w-10 rounded-sm bg-extraColor "></div>
                <div className="flex flex-col gap-2">
                    <div className="h-6 w-6 rounded-full   bg-extraColor "></div>
                    <div className="h-6 w-6   rounded-full bg-extraColor  "></div>
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-sm bg-extraColor "></div>

            <div className="absolute bottom-0 flex h-20 w-full animate-pulse flex-col gap-2  p-5">
                <div className="h-5 w-1/2  rounded-full bg-extraColor "></div>
                <div className="h-5 w-3/4  rounded-full bg-extraColor "></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
