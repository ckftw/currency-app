/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencyConvertor = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);

    const fetchCurrencies = async () => {
        try {
            const response = await fetch("https://api.frankfurter.app/currencies");
            const data = await response.json();
            console.log("data", data);
            setCurrencies(Object.keys(data));
        } catch (e) {
            console.error("error", e);
        }
    };
    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleCurrencyConvert = async () => {
        if (!amount) return;
        setConverting(true);
        try {
            const response = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await response.json();
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
            console.log('data', data);

        } catch (e) {
            console.log("e", e);
        } finally {
            setConverting(false);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Currency Converter App</h1>
      
          <div className="flex items-center justify-between space-x-4 mb-6">
            <CurrencyDropdown
              title={"From"}
              currencies={currencies}
              currency={fromCurrency}
              setCurrency={setFromCurrency}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              onClick={swapCurrencies}
            >
              Swap
            </button>
            <CurrencyDropdown
              title={"To"}
              currencies={currencies}
              currency={toCurrency}
              setCurrency={setToCurrency}
            />
          </div>
      
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-300 font-medium mb-2">Amount:</label>
            <input
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </div>
      
          <div className="flex justify-center mb-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleCurrencyConvert}
            >
              Convert
            </button>
          </div>
      
          <div className="text-xl font-semibold text-center text-green-400">
            Converted Amount : {convertedAmount}
          </div>
        </div>
      </div>
      

    );
};

export default CurrencyConvertor;
