import { useState } from 'react';

const useSearchForm = () => {
  const [query, setQuery] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return { query, handleChange };
};

export default useSearchForm;
