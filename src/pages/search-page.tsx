import { useState } from 'react';
import WhoIsSearchResults from '../compoments/whois-search-results/search-results';
import WhoIsSearchForm from '../compoments/whois-search-form/search-form';
import useWhois from '../hooks/useWhoIs';
import useDNS from '../hooks/useDNS';
import './search-page.scss';
import DNSSearchForm from '../compoments/dns-search-form/dns-search-form';
import DNSSearchResults from '../compoments/dns-search-results/dns-search-results';

const SearchPage = () => {
  const { whoisData, error, fetchWhoisData } = useWhois();
  const [shouldClear, setShouldClear] = useState(false);
  const { dnsData, dnsError, fetchDNSData } = useDNS();
  const [shouleClearDNS, setShouldClearDNS] = useState(false);

  const handleSubmit = (ipAddress: string) => {
    fetchWhoisData(ipAddress);
  };

  const handleDNSSubmit = (dns: string) => {
    fetchDNSData(dns);
  }

  const handleClear = () => {
    setShouldClear(true);
  };

  const handleCleared = () => {
    setShouldClear(false);
  };


  const handleDNSClear = () => {
    setShouldClearDNS(true);
  };

  const handleDNSCLEARED = () => {
    setShouldClearDNS(false);
  };

  return (
    //this is all being passed down as props from the api request, fine for now, fairly shallow
    //thinking about future proofing, if we wanted to keep a list of saved searches etc
    //could proably use context/memoization, app of this size probably doesnt need redux
    <div className='search-page'>
      <WhoIsSearchForm onSubmit={handleSubmit} onClear={handleClear} />
      <WhoIsSearchResults
        whoisData={whoisData}
        error={error}
        shouldClear={shouldClear}
        onCleared={handleCleared}
      />
      <DNSSearchForm onSubmit={handleDNSSubmit} onClear={handleDNSClear} />
      <DNSSearchResults
        dnsData={dnsData}
        error={dnsError}
        shouldClear={shouldClear}
        onCleared={handleDNSCLEARED}
      />
    </div>
  );
};

export default SearchPage;
