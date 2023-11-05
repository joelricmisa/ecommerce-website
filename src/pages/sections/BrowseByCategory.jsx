import { CategoryCard } from "../../components";
import { ProductData } from "../../constants";
import { v4 as uuid } from "uuid";

const BrowseByCategory = () => {
    return (
        <div className="padding border-bottom mx-auto flex w-full flex-col gap-10">
            <div className="flex-center h-10 justify-start font-semibold text-tertiary-100 ">
                <span className="h-10 w-5 rounded-sm bg-tertiary-100 "></span>
                Categories
            </div>
            <div className="flex h-14 items-end font-inter text-4xl font-semibold">
                Browse By Category
            </div>
            <div className="grid grid-cols-2 gap-5 px-10 sm:grid-cols-3 lg:grid-cols-4 lg:py-10 xl:grid-cols-6 ">
                {ProductData.browseByCategory.map((category) => {
                    // console.log(category);
                    return (
                        <CategoryCard
                            key={uuid()}
                            categoryName={category.categoryName}
                            categoryImage={category.categoryImage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BrowseByCategory;
