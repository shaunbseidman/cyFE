export interface WhoIsInterface {
  success: boolean;
  ip: string;
  city: string;
  continent: string;
  postal: string;
  region_code: string;
  country_code: string;
  connection: ConnectionInterface;
}

interface ConnectionInterface {
  domain: string;
  isp: string;
}