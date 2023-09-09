import { playStation, attractiveWoman, speaker, gucciPerfume } from "../../assets/images";
import { NewArrivalCardText } from "../../components";

const NewArrival = () => {
	return (
		<div className="flex flex-col w-full gap-10 mx-auto padding ">
			<div className="justify-start h-10 font-semibold text-tertiary-100 flex-center">
				<span className="w-5 h-10 rounded-sm bg-tertiary-100 "></span>
				Featured
			</div>
			<div className="text-4xl font-semibold font-inter">New Arrival</div>
			<div className="flex flex-col md:flex-row md:h-[600px]  gap-5 text-primary rounded-sm">
				{/* 1 */}
				<div className="relative items-end w-full rounded-sm bg-secondary flex-center lg:w-1/2">
					<img
						src={playStation}
						alt=""
					/>
					<NewArrivalCardText
						title={"PlayStation 5"}
						description={"Black and White version of the PS5 coming out on sale."}
					/>
				</div>
				{/* 2 */}
				<div className="flex flex-col w-full lg:w-1/2">
					<div className="relative flex items-end justify-end rounded-sm bg-secondary h-1/2">
						<img
							src={attractiveWoman}
							alt=""
						/>
						<NewArrivalCardText
							title={"Women’s Collections"}
							description={"Featured woman collections that give you another vibe."}
						/>
					</div>
					<div className="flex gap-5 mt-5 h-1/2">
						<div className="relative w-1/2 px-5 rounded-sm bg-secondary grid-center pt-14">
							<img
								src={speaker}
								alt=""
							/>
							<NewArrivalCardText
								title={"Speakers"}
								description={"Amazon wireless speakers."}
							/>
						</div>
						<div className="relative w-1/2 px-5 rounded-sm bg-secondary grid-center pt-14">
							<img
								src={gucciPerfume}
								alt=""
							/>
							<NewArrivalCardText
								title={"Perfume"}
								description={"Gucci Intense Oud Edp"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewArrival;
