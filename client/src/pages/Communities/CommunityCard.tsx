const CommunityCard = () => {
  return (
    <>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border-2 md:aspect-square md:w-[calc(33.33%-0.8333rem)] 2xl:w-[calc(25%-0.9375rem)]">
        <div className="bg-color_1 flex min-h-fit flex-row gap-3 p-3  pb-1 text-white shadow-custom">
          <div className="mb-2 flex aspect-square min-w-[50px] items-center justify-center rounded-full border-2 bg-white hover:cursor-pointer lg:min-w-[60px]"></div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h3 className="block overflow-hidden overflow-ellipsis whitespace-nowrap font-bold uppercase">
              AAAAAAAAAAAAAAAAAAA
            </h3>
            <h4 className="overflow-ellipsis whitespace-nowrap">120 members</h4>
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between bg-white p-3 pt-0  shadow-custom">
          <p className="max-h-4/5 mb-2 mt-1 overflow-hidden overflow-ellipsis text-black">
            Join our cooking society or else I'm going home. Going to sleep.
          </p>
          <button className="bg-lightGreen p-1 text-xl font-bold uppercase shadow-custom">
            Join
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
