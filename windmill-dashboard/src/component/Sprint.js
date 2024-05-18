import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBack } from '../service/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';



const Sprint = () => {
  const [sprintItems, setSprintItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const { ids } = useParams();
  const datepickerEl = document.getElementById('datepickerId');

  

  useEffect(() => {
    if (ids) {
      const selectedIds = ids.split(',');
      getBack()
        .then(data => {
          const sprintData = data.filter(item => selectedIds.includes(item.id));
          setSprintItems(sprintData);
        })
        .catch(error => {
          console.error('Error fetching sprint data:', error);
        });
    }
  }, [ids]);

  useEffect(() => {
    // Fetch data from the API
    getBack()
      .then(data => {
        // Filter the data to get only items with sprint set to true
        const sprintData = data.filter(item => item.sprint);
        // Set the sprint items state
        setSprintItems(sprintData);
      })
      .catch(error => {
        console.error('Error fetching sprint data:', error);
      });
  }, []);

  
const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-500",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
};


  const [show, setShow] = useState(false);
  
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {sprintItems.map((item) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-sm">
                <label className="block mt-2 text-sm"> 
                  <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                    <option>Instagram</option>
                    <option>Whatsapp</option>
                    <option>Snapchat</option>
                    <option>Pinterest</option>
                  </select>
              </label>
                </td>

                <td className="px-4 py-3 text-xs">
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
                </td>
                <td className="px-4 py-3 text-sm">
                <textarea className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" rows="3" placeholder="Enter some long form content." />

                </td>
                <td className="px-4 py-3 text-sm">

                <DatePicker
            placeholderText="Select Date"
            className="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}

          />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 my-6">
  <div className="flex space-x-4">
    <Link to="Form2">
      <button className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-800">
        Prioritize Task
        <span className="ml-2" aria-hidden="true">+</span>
      </button>
    </Link>
    <Link to="Form1">
      <button className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
        Create Task
        <span className="ml-2" aria-hidden="true">+</span>
      </button>
    </Link>
  </div>

</div>


    </div>
  );
};

export default Sprint;
