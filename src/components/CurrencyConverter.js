import React, { useState, useEffect } from 'react';
import getExchangeRates from '../services/ExchangeRateService';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExchangeRates(fromCurrency);
        setExchangeRate(data.rates[toCurrency]);
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    fetchData();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);

  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  return (
    <div className="converter">
      <h2>Currency Converter</h2>
      <div className="converter-inputs">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="converter-result">
        {exchangeRate && (
          <h3>
            {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
          </h3>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
