import { SvgIcon } from "./index";

const ShopInfoCard = ({ iconVal, numbers, description }) => {
	return (
		<div className="flex-center flex-col flex-wrap shadow-md rounded-sm h-[300px]  text-center ">
			<span className="w-20 h-20 bg-no-repeat bg-icon grid-center">
				<SvgIcon
					icon={iconVal}
					classVal={"text-white"}
				/>
			</span>
			<h1 className="text-3xl font-bold font-inter ">{numbers}</h1>
			<p>{description}</p>
		</div>
	);
};

export default ShopInfoCard;
