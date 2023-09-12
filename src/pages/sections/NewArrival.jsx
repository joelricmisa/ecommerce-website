import { NewArrivalCardText } from "../../components";
import { NewArrivalData } from "../../constants";

const NewArrival = () => {
    return (
        <div className="padding mx-auto flex w-full flex-col gap-10 ">
            <div className="flex-center h-10 justify-start font-semibold text-tertiary-100">
                <span className="h-10 w-5 rounded-sm bg-tertiary-100 "></span>
                Featured
            </div>
            <div className="font-inter text-4xl font-semibold">New Arrival</div>

            <div className="grid grid-rows-2 gap-5 rounded-sm text-primary  md:h-[600px] md:grid-cols-12 md:flex-row">
                {NewArrivalData.map((item, index) => (
                    <div
                        key={index}
                        className={`${index === 0 ? "row-span-2" : ""} ${
                            index >= 2 ? "col-span-3 px-5 pt-14" : "col-span-6"
                        } flex-center relative rounded-sm bg-secondary `}
                    >
                        <img src={item.img} alt="" />
                        <NewArrivalCardText
                            title={item.title}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrival;
