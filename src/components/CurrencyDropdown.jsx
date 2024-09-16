import React from 'react'

const CurrencyDropdown = ({currencies,currency,setCurrency,title}) => {
  return (
    <div className="mb-4">
  <label htmlFor={title} className="block text-gray-300 font-semibold mb-2">
    {title}
  </label>
  <div>
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
    >
      {currencies?.map((currency) => (
        <option value={currency} key={currency} className="text-gray-900">
          {currency}
        </option>
      ))}
    </select>
  </div>
</div>

  )
}

export default CurrencyDropdown