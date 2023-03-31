import { useState, useEffect } from 'react';
import { WhoIsInterface } from '../../models/who-is-interface';
import './search-results.scss';

interface SearchResultsProps {
  whoisData: WhoIsInterface | null;
  error: Error | null;
  shouldClear: boolean;
  onCleared: () => void;
}

const WhoIsSearchResults = ({ whoisData, error, shouldClear, onCleared }: SearchResultsProps) => {
  const [dataCleared, setDataCleared] = useState(false);

  useEffect(() => {
    if (shouldClear) {
      setDataCleared(true);
      onCleared();
    } else if (dataCleared) {
      setDataCleared(false);
    }
  }, [shouldClear, dataCleared, onCleared]);

  if (dataCleared) {
    return null;
  }

  if (!whoisData && !error) {
    return null;
  }

  return (
    <div className='results'>
      {/* handle actual API error - could be logged but in the interest of time */}
      {error ? (
        <div>
          <p className='results-error'>Error:</p>
          <pre className='results-error'>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : whoisData?.success ? (
        // successful res bool, this could be broken out into its own compoment but time
        <div className='result-container'>
          <p 
            className='result ip' 
            aria-label={`Data for ${whoisData?.ip}`}
          >
            Data for: {whoisData?.ip}
          </p>
            <p 
              className='result location'
              aria-label='result location'
            >
              {whoisData?.city} {whoisData?.region_code} {whoisData?.postal} {whoisData?.country_code} {whoisData?.continent}
            </p>
          {whoisData?.connection && (
            <div className='result-connection'>
              <p className='result domain'>Domain: {whoisData.connection.domain}</p>
              <p className='result isp'>ISP: {whoisData.connection.isp}</p>
            </div>
          )}
        </div>
      ) : (
        // handle search for a random string/number, api still sends a res but checks against success bool
        <p className='results-error'>Invalid search, please try again</p>
      )}
    </div>
  );
};

export default WhoIsSearchResults;
