import { useState } from 'react';
import { WhoIsInterface } from '../models/who-is-interface';

interface UseWhoisResult {
  whoisData: WhoIsInterface | null;
  isLoading: boolean;
  error: Error | null;
  fetchWhoisData: (ipAddress: string) => Promise<void>;
}

const useWhois = (): UseWhoisResult => {
  const [whoisData, setWhoisData] = useState<WhoIsInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchWhoisData = async (ipAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/ipwho.is/${ipAddress}`);
      const data = await response.json();
      setWhoisData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  return { whoisData, isLoading, error, fetchWhoisData };
};

export default useWhois;