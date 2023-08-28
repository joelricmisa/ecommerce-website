const BigSpeaker = () => {
	return (
		<div className="flex  mx-auto mt-28 xl:w-11/12  bg-black h-[500px] rounded-sm">
			<div className="flex-center items-start flex-col gap-10 w-1/2 p-10 lg:p-24">
				<h3 className="text-tertiary text-base font-medium">Categories</h3>
				<h1 className="text-2xl xs:text-3xl	md:text-5xl text-white font-inter font-semibold md:leading-snug">Enhance Your Music Experience</h1>
				<button type="button" className="button px-5 sm:px-10 mx-0 lg:w-1/2">
					Buy Now!
				</button>
			</div>
			<div className="w-1/2 grid-center relative before:absolute before:h-1/2 lg:before:h-[95%] before:w-full before:bg-white before:opacity-50 before:rounded-full before:blur-3xl">
				<img className="scale-100" src="/src/assets/images/jbl-speaker.png" alt="" />
			</div>
		</div>
	);
};

export default BigSpeaker;
