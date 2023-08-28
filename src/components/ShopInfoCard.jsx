import { SvgIcon } from "./index";

const ShopInfoCard = ({ iconVal, numbers, description }) => {
	return (
		<div className="flex-center flex-col flex-wrap shadow-md rounded-sm h-[300px]  text-center ">
			<span className="bg-icon bg-no-repeat grid-center h-20 w-20">
				<SvgIcon icon={iconVal} classVal={"text-white"} />
			</span>
			<h1 className="text-3xl font-bold font-inter ">{numbers}</h1>
			<p>{description}</p>
		</div>
	);
};

export default ShopInfoCard;
