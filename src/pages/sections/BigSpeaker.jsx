const BigSpeaker = () => {
	return (
		<div className="flex  mx-auto mt-28 w-10/12 font-poppins bg-black h-[500px] rounded-sm">
			<div className="flex flex-col w-1/2 p-24 space-y-10">
				<h3 className="text-tertiary text-base font-medium">Categories</h3>
				<h1 className="text-5xl text-white font-inter font-semibold leading-snug">Enhance Your Music Experience</h1>
				<button type="button" className="bg-secondary py-3 px-4 w-1/2 text-white font-semibold">
					Buy Now!
				</button>
			</div>
			<div className="w-1/2 relative">
				<span className="absolute inset-0 z-10 w-[150%] -left-32">
					<img src="/src/assets/images/light.png" alt="light" />
				</span>
				<img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" src="/src/assets/images/jbl-speaker.png" alt="" />
			</div>
		</div>
	);
};

export default BigSpeaker;
