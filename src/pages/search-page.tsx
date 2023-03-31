import { useState } from 'react';
import SearchResults from '../compoments/search-results/search-results';
import SearchForm from '../compoments/searh-form/search-form';
import useWhois from '../hooks/useWhoIs';
import './search-page.scss';

const SearchPage = () => {
  const { whoisData, error, fetchWhoisData } = useWhois();
  const [shouldClear, setShouldClear] = useState(false);

  const handleSubmit = (ipAddress: string) => {
    fetchWhoisData(ipAddress);
  };

  const handleClear = () => {
    setShouldClear(true);
  };

  const handleCleared = () => {
    setShouldClear(false);
  };

  return (
    //this is all being passed down as props from the api request, fine for now, fairly shallow
    //thinking about future proofing, if we wanted to keep a list of saved searches etc
    //could proably use context/memoization, app of this size probably doesnt need redux
    <div className='search-page'>
      <SearchForm onSubmit={handleSubmit} onClear={handleClear} />
      <SearchResults
        whoisData={whoisData}
        error={error}
        shouldClear={shouldClear}
        onCleared={handleCleared}
      />
    </div>
  );
};

export default SearchPage;
