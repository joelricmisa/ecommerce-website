import { SvgIcon } from "./index";

const ShopInfoCard = ({ iconVal, numbers, description }) => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 shadow-md rounded-sm w-[270px] px-5 py-12 ">
			<span className="bg-icon bg-no-repeat grid place-items-center h-20 w-20">
				<SvgIcon icon={iconVal} classVal={"text-white"} />
			</span>
			<h1 className="text-3xl font-bold font-inter ">{numbers}</h1>
			<p className="font-poppins font-base">{description}</p>
		</div>
	);
};

export default ShopInfoCard;
