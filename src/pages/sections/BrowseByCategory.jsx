import { CategoryCard } from "../../components";
import { arrowLeft, arrowRight } from "../../assets/icons";
import { ProductData } from "../../constants";
import { v4 as uuid } from "uuid";

const BrowseByCategory = () => {
	return (
		<div className="flex flex-col pt-32 pb-16 mx-auto w-10/12 font-poppins border-b border-black/20">
			<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-5 h-10 ">
				<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
				Categories
			</div>
			<div className="flex items-end  font-inter text-4xl font-semibold mb-10 h-14">
				Browse By Category
				<span className="flex ml-auto space-x-2 mr-10">
					<img src={arrowLeft} className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
					<img src={arrowRight} className="bg-tertiary rounded-full p-1 cursor-pointer shadow-sm" alt="" />
				</span>
			</div>
			<div className="grid grid-cols-6 px-10 gap-10 py-10 ">
				{ProductData.browseByCategory.map((category) => {
					console.log(category);
					return <CategoryCard key={uuid()} categoryName={category.categoryName} categoryImage={category.categoryImage} />;
				})}
			</div>
		</div>
	);
};

export default BrowseByCategory;
