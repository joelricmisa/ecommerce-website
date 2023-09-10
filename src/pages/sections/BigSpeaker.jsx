const BigSpeaker = () => {
  return (
    <div className="mx-auto  mt-28 flex h-[500px]  rounded-sm bg-secondary xl:w-11/12">
      <div className="flex-center w-1/2 flex-col items-start gap-10 p-10 lg:p-24">
        <h3 className="text-tertiary text-base font-medium">Categories</h3>
        <h1 className="font-inter text-2xl font-semibold text-primary xs:text-3xl md:text-5xl md:leading-snug">
          Enhance Your Music Experience
        </h1>
        <button type="button" className="button mx-0 px-5 sm:px-10 lg:w-1/2">
          Buy Now!
        </button>
      </div>
      <div className="grid-center relative w-1/2 before:absolute before:h-1/2 before:w-full before:rounded-full before:bg-primary before:opacity-50 before:blur-3xl lg:before:h-[95%]">
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
