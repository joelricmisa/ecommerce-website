import { CategoryCard, SvgIcon } from "../../components";
import { arrowLeft, arrowRight } from "../../assets/icons/SvgIconsList";
import { ProductData } from "../../constants";
import { v4 as uuid } from "uuid";

const BrowseByCategory = () => {
	return (
		<div className="flex flex-col padding mx-auto w-full gap-10 border-bottom">
			<div className="text-secondary font-semibold flex-center justify-start  h-10 ">
				<span className="w-5 h-10 bg-secondary rounded-sm "></span>
				Categories
			</div>
			<div className="flex items-end  font-inter text-4xl font-semibold  h-14">
				Browse By Category
				<span className="flex ml-auto space-x-2 mr-10">
					<SvgIcon icon={arrowLeft()} classVal={"bg-tertiary rounded-full p-1 cursor-pointer shadow-sm"} />
					<SvgIcon icon={arrowRight()} classVal={"bg-tertiary rounded-full p-1 cursor-pointer shadow-sm"} />
				</span>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-10 gap-5 lg:py-10 ">
				{ProductData.browseByCategory.map((category) => {
					// console.log(category);
					return <CategoryCard key={uuid()} categoryName={category.categoryName} categoryImage={category.categoryImage} />;
				})}
			</div>
		</div>
	);
};

export default BrowseByCategory;
