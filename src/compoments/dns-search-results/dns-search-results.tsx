import { useState, useEffect } from 'react';
import { DNSInterface } from '../../models/dns-interface';
import './dns-search-results.scss';

interface DNSSearchResultsProps {
  dnsData: DNSInterface | null;
  error: Error | null;
  shouldClear: boolean;
  onCleared: () => void;
}

const DNSSearchResults = ({ dnsData, error, shouldClear, onCleared }: DNSSearchResultsProps) => {
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

  if (!dnsData && !error) {
    return null;
  }
  console.log(dnsData, 'foobar')
  return (
    <div className='results'>
      {error ? (
        <div>
          <pre className='results-error'>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : dnsData ? (
        <div className='dns-results-result'>
          {dnsData.ErrorMessage && dnsData.ErrorMessage.msg && (
            <p className='results-error'>{dnsData.ErrorMessage.msg}</p>
          )}
          {dnsData.DNSData && dnsData.DNSData.domainName && (
            <div>
              <p className='result domain'>{dnsData.DNSData.domainName}</p>
              <p className='result date'>Created at: {dnsData.DNSData.audit.createdDate}</p>
              <p className='result date'>Updated at: {dnsData.DNSData.audit.updatedDate}</p>
            </div>
          )}
        </div>
      ) : null }
    </div>
  );
};

export default DNSSearchResults;
