const BigSpeaker = () => {
	return (
		<div className="flex  mx-auto mt-28 xl:w-11/12  bg-secondary h-[500px] rounded-sm">
			<div className="flex-col items-start w-1/2 gap-10 p-10 flex-center lg:p-24">
				<h3 className="text-base font-medium text-tertiary">Categories</h3>
				<h1 className="text-2xl font-semibold xs:text-3xl md:text-5xl text-primary font-inter md:leading-snug">
					Enhance Your Music Experience
				</h1>
				<button
					type="button"
					className="px-5 mx-0 button sm:px-10 lg:w-1/2">
					Buy Now!
				</button>
			</div>
			<div className="w-1/2 grid-center relative before:absolute before:h-1/2 lg:before:h-[95%] before:w-full before:bg-primary before:opacity-50 before:rounded-full before:blur-3xl">
				<img
					className="scale-100"
					src="/src/assets/images/jbl-speaker.png"
					alt=""
				/>
			</div>
		</div>
	);
};

export default BigSpeaker;
