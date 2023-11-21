const CommunityCard = () => {
  return (
    <>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border-2 md:aspect-square md:w-[calc(50%-0.375rem)] lg:w-[calc(33.33%-0.8333rem)] 2xl:w-[calc(20%-1rem)]">
        <div className="flex flex-row gap-3  overflow-hidden bg-secondary p-3 pb-1 shadow-custom">
          <div className="mb-2 flex aspect-square min-w-[50px] items-center justify-center rounded-full border-2 bg-white hover:cursor-pointer lg:min-w-[60px]"></div>
          <div className="flex flex-col justify-center">
            <h3 className="uppercase">Cooking Club</h3>
            <h4>120 members</h4>
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-between bg-white p-3 pt-0 shadow-custom">
          <p className="mb-2 mt-1">Join our cooking society.</p>
          <button className="bg-lightGreen p-1 text-xl font-bold uppercase shadow-custom">
            Join Community
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
