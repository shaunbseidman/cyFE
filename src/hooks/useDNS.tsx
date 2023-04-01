import { useState, useEffect } from 'react';
import { DNSInterface } from '../models/dns-interface';

interface DNSResult {
  dnsData: DNSInterface | null;
  isLoading: boolean;
  dnsError: Error | null;
  fetchDNSData: (dns: string) => Promise<void>;
}

const useDNS = (): DNSResult => {
  const [dnsData, setDNSData] = useState<DNSInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dnsError, setError] = useState<Error | null>(null);
  
  const fetchDNSData = async (dnsAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/dns/${dnsAddress}`);
      const data = await response.json();
      setDNSData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };
  
  return { dnsData, isLoading, dnsError, fetchDNSData };
};

export default useDNS;
