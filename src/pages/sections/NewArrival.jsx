import { playStation, attractiveWoman, speaker, gucciPerfume } from "../../assets/images";
import { NewArrivalCardText } from "../../components";

const NewArrival = () => {
	return (
		<div className="flex flex-col padding mx-auto  w-full gap-10  ">
			<div className=" text-tertiary-100 font-semibold flex-center justify-start  h-10 ">
				<span className="w-5 h-10 bg-tertiary-100 rounded-sm "></span>
				Featured
			</div>
			<div className="font-inter text-4xl font-semibold">New Arrival</div>
			<div className="flex flex-col md:flex-row md:h-[600px]  gap-5 text-primary rounded-sm">
				{/* 1 */}
				<div className=" bg-secondary flex-center items-end  relative rounded-sm w-full lg:w-1/2 ">
					<img src={playStation} alt="" />
					<NewArrivalCardText title={"PlayStation 5"} description={"Black and White version of the PS5 coming out on sale."} />
				</div>
				{/* 2 */}
				<div className="flex flex-col w-full  lg:w-1/2">
					<div className="bg-secondary flex items-end justify-end relative rounded-sm h-1/2">
						<img src={attractiveWoman} alt="" />
						<NewArrivalCardText title={"Women’s Collections"} description={"Featured woman collections that give you another vibe."} />
					</div>
					<div className=" flex gap-5 mt-5 h-1/2">
						<div className="bg-secondary grid-center relative rounded-sm w-1/2 pt-14 px-5">
							<img src={speaker} alt="" />
							<NewArrivalCardText title={"Speakers"} description={"Amazon wireless speakers."} />
						</div>
						<div className="bg-secondary grid-center relative rounded-sm w-1/2 pt-14 px-5">
							<img src={gucciPerfume} alt="" />
							<NewArrivalCardText title={"Perfume"} description={"Gucci Intense Oud Edp"} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewArrival;
