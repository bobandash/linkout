import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommunityCard from './CommunityCard';
import PageMainContentContainer from '../../components/PageMainContentContainer';

const CommunitiesComponent = () => {
  return (
    <PageMainContentContainer>
      <div className="bg-color_3 flex-grow">
        <div>
          <div className="mx-auto rounded-lg border-2 bg-primary bg-secondary p-5 ">
            <h1 className="text-center text-xl font-bold uppercase text-white md:text-2xl lg:text-3xl xl:text-4xl">
              Find Interesting People
            </h1>
            <h2 className="mb-3 text-center text-xl text-white md:text-2xl">
              Join a community and start linking out.
            </h2>
            <form className="mx-auto w-4/5 max-w-[500px] lg:text-xl">
              <div className="relative w-full">
                <input className="rounded-1 w-full border-2 px-1 font-play focus:outline-none" />
                <button
                  className="absolute right-2 top-1/2 w-fit -translate-y-1/2"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>
          </div>
          <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
            Biggest Communities
          </h1>
          <div className="flex-row flex-wrap md:flex md:gap-3 xl:gap-5">
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
          </div>
        </div>
      </div>
    </PageMainContentContainer>
  );
};

export default CommunitiesComponent;
