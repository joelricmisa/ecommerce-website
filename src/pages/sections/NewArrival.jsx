import {
  playStation,
  attractiveWoman,
  speaker,
  gucciPerfume,
} from "../../assets/images";
import { NewArrivalCardText } from "../../components";

const NewArrival = () => {
  return (
    <div className="padding mx-auto flex w-full flex-col gap-10 ">
      <div className="flex-center h-10 justify-start font-semibold text-tertiary-100">
        <span className="h-10 w-5 rounded-sm bg-tertiary-100 "></span>
        Featured
      </div>
      <div className="font-inter text-4xl font-semibold">New Arrival</div>
      <div className="flex flex-col gap-5 rounded-sm  text-primary md:h-[600px] md:flex-row">
        {/* 1 */}
        <div className="flex-center relative w-full items-end rounded-sm bg-secondary lg:w-1/2">
          <img src={playStation} alt="" />
          <NewArrivalCardText
            title={"PlayStation 5"}
            description={
              "Black and White version of the PS5 coming out on sale."
            }
          />
        </div>
        {/* 2 */}
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="relative flex h-1/2 items-end justify-end rounded-sm bg-secondary">
            <img src={attractiveWoman} alt="" />
            <NewArrivalCardText
              title={"Women’s Collections"}
              description={
                "Featured woman collections that give you another vibe."
              }
            />
          </div>
          <div className="mt-5 flex h-1/2 gap-5">
            <div className="grid-center relative w-1/2 rounded-sm bg-secondary px-5 pt-14">
              <img src={speaker} alt="" />
              <NewArrivalCardText
                title={"Speakers"}
                description={"Amazon wireless speakers."}
              />
            </div>
            <div className="grid-center relative w-1/2 rounded-sm bg-secondary px-5 pt-14">
              <img src={gucciPerfume} alt="" />
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
