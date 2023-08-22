import { Link } from "react-router-dom";
import { playStation, attractiveWoman, speaker, gucciPerfume } from "../../assets/images";
Link;
const NewArrival = () => {
	return (
		<div className="flex flex-col pt-32 pb-16 mx-auto w-10/12 font-poppins ">
			<div className=" grid-cols-12 text-secondary font-semibold flex items-center mb-5 h-10 ">
				<span className="w-5 h-10 bg-secondary inline-block rounded-sm mr-4"></span>
				Featured
			</div>
			<div className="flex items-end  font-inter text-4xl font-semibold mb-10 h-14">New Arrival</div>
			<div className="grid w-full grid-cols-2 h-[600px]  gap-5 text-white rounded-sm">
				<div className=" bg-black flex items-end justify-center relative rounded-sm">
					<img src={playStation} alt="" />
					<span className="bottom-0 left-0 absolute p-10 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
						<h1 className="text-2xl font-semibold">PlayStation 5</h1>
						<p className="text-sm w-1/2">Black and White version of the PS5 coming out on sale.</p>
						<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
					</span>
				</div>
				<div className="  grid grid-rows-2 ">
					<div className="bg-black flex items-end justify-end relative rounded-sm">
						<img src={attractiveWoman} alt="" />
						<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
							<h1 className="text-2xl font-semibold">Women’s Collections</h1>
							<p className="text-sm w-1/2">Featured woman collections that give you another vibe.</p>
							<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
						</span>
					</div>
					<div className=" grid grid-cols-2 gap-5 mt-5">
						<div className="bg-black grid place-items-center relative rounded-sm">
							<img src={speaker} alt="" />
							<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
								<h1 className="text-2xl font-semibold">Speakers</h1>
								<p className="text-sm w-full">Amazon wireless speakers.</p>
								<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
							</span>
						</div>
						<div className="bg-black grid place-items-center relative rounded-sm">
							<img src={gucciPerfume} alt="" />
							<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end space-y-2 bg-black/30 h-full w-full">
								<h1 className="text-2xl font-semibold">Perfume</h1>
								<p className="text-sm w-full capitalize">Gucci Intense Oud Edp</p>
								<Link className="text-base font-medium underline underline-offset-2">Shop Now</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewArrival;
