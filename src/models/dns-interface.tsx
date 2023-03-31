export interface DNSInterface {
  DNSData: {
    domainName: string;
    audit: {
      createdDate: string;
      updatedDate: string;
    }
  }
  ErrorMessage: DNSErrorInterface;
}

 interface DNSErrorInterface {
   msg: string;
}