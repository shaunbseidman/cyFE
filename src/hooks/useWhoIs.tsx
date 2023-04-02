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
      // for local dev use localhost:8080, commented out resposne variable is deployed container
      // const response = await fetch(`http://localhost:8080/ipwho.is/${ipAddress}`);
      const response = await fetch(`https://cyderes-sbe3pib3ca-uc.a.run.app/ipwho.is/${ipAddress}`);
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
