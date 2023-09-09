import { CategoryCard, SvgIcon } from "../../components";
import { arrowLeft, arrowRight } from "../../assets/icons/SvgIconsList";
import { ProductData } from "../../constants";
import { v4 as uuid } from "uuid";

const BrowseByCategory = () => {
	return (
		<div className="flex flex-col w-full gap-10 mx-auto padding border-bottom">
			<div className="justify-start h-10 font-semibold text-tertiary-100 flex-center ">
				<span className="w-5 h-10 rounded-sm bg-tertiary-100 "></span>
				Categories
			</div>
			<div className="flex items-end text-4xl font-semibold font-inter h-14">
				Browse By Category
				<span className="flex ml-auto mr-10 space-x-2">
					<SvgIcon
						icon={arrowLeft()}
						classVal={"icon"}
					/>
					<SvgIcon
						icon={arrowRight()}
						classVal={"icon"}
					/>
				</span>
			</div>
			<div className="grid grid-cols-2 gap-5 px-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:py-10 ">
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
