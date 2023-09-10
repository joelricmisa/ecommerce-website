import { SvgIcon } from "./index";

const ShopInfoCard = ({ iconVal, numbers, description }) => {
  return (
    <div className="flex-center h-[300px] flex-col flex-wrap rounded-sm text-center  shadow-md ">
      <span className="grid-center h-20 w-20 bg-icon bg-no-repeat">
        <SvgIcon icon={iconVal} classVal={"text-white"} />
      </span>
      <h1 className="font-inter text-3xl font-bold ">{numbers}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ShopInfoCard;
