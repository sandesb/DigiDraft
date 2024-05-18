import React from 'react';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Form2() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="px-6 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 wid">
      <label className="block text-sm">
        <span className="text-gray-700 dark:text-gray-400">Name</span>
        <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
      </label>



      <label className="block mt-4 text-sm">
        <span className="text-gray-700 dark:text-gray-400">Type</span>
        <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
          <option>Instagram</option>
          <option>Whatsapp</option>
          <option>Snapchat</option>
          <option>Pinterest</option>
        </select>
      </label>

      <div className="mt-4 text-sm">
        <span className="text-gray-700 dark:text-gray-400">Account Type</span>
        <div className="mt-2">
          <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
            <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="personal" />
            <span className="ml-2">Low</span>
          </label>
          <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
            <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="business" />
            <span className="ml-2">Medium</span>
          </label>
          <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
            <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="business" />
            <span className="ml-2">High</span>
          </label>
        </div>
      </div>
   

      <label className="block mt-4 text-sm">
        <span className="text-gray-700 dark:text-gray-400">Message</span>
        <textarea className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" rows="3" placeholder="Enter some long form content." />
      </label>

      <DatePicker
            placeholderText="Select Date"
            className="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}

          />

      <button className='flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>Ok</button>
    </div>
  );
}

export default Form2;
