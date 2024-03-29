import classNames from 'classnames';
import React, { useState } from 'react';

interface DNSSearchFormProps {
  onSubmit: (domainName: string) => void;
  onClear: () => void;
}

const DNSSearchForm = ({ onSubmit, onClear }: DNSSearchFormProps) => {
  const [dnsAddress, setDNSAddpress] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(dnsAddress);
  };

  const handleClear = () => {
    setDNSAddpress('');
    onClear();
  };

  // be super duper sure and check for whitespace
  const isDisabled = dnsAddress.trim() === '';

  return (
    <>
      <h2 className='search-form-header'>Search for a DNS!</h2>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          className='search-form-input'
          placeholder='Enter your DNS here'
          type="text"
          value={dnsAddress}
          onChange={(event) => setDNSAddpress(event.target.value)}
        />
        <div className='search-form-button-wrapper'>
          {/* hacky way to ensure no emtpy string searches are requested leading to errrors, disable button till text inputed */}
          <button
            className={classNames('search-form-button', 'submit', { disabled: isDisabled })}
            type="submit"
            disabled={isDisabled}
          >
            Search
          </button>
          <button
            className={classNames('search-form-button', 'clear', { disabled: isDisabled })}
            type="button"
            onClick={handleClear}
            disabled={isDisabled}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default DNSSearchForm;
