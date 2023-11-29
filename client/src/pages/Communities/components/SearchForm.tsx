import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface SearchFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: FC<SearchFormProps> = ({ handleChange }) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="bg-secondary mx-auto rounded-lg border-2 bg-primary p-5 ">
      <h1 className="text-center text-xl font-bold uppercase text-white md:text-2xl lg:text-3xl xl:text-4xl">
        Find Interesting People
      </h1>
      <h2 className="mb-3 text-center text-xl text-white md:text-2xl">
        Join a community and start linking out.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-4/5 max-w-[500px] lg:text-xl"
      >
        <div className="relative w-full">
          <input
            className="rounded-1 w-full border-2 px-1 font-play focus:outline-none"
            onChange={handleChange}
          />
          <button
            className="absolute right-2 top-1/2 w-fit -translate-y-1/2"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
