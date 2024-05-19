import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllData, getBack,updateSprintItems } from '../service/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';



const Sprint = () => {
  const [sprintItems, setSprintItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const { ids } = useParams();
  const datepickerEl = document.getElementById('datepickerId');

  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [comment, setComment] = useState('');

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
    getAllData()
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

  useEffect(() => {
    const fetchSprintData = async () => {
      try {
        const data = await getBack();
        const sprintData = data.filter(item => item.sprint === true);
        setSprintItems(sprintData.map(item => ({
          ...item,
          type: '',
          difficulty: '',
          comment: '',
          selectedDate: new Date(),
        })));
      } catch (error) {
        console.error('Error fetching sprint data:', error);
      }
    };

    fetchSprintData();
  }, []);

  const handleUpdate = async () => {
    const itemUpdates = sprintItems.map(item => ({
      id: item.id,
      Type: item.type,
      Difficulty: item.difficulty,
      Comment: item.comment,
      Date: item.selectedDate ? item.selectedDate.toISOString().split('T')[0] : null, // Check if selectedDate is defined
    }));
  
    try {
      await updateSprintItems(itemUpdates);
      alert('Sprint items updated successfully');
    } catch (error) {
      alert('Failed to update sprint items');
    }
  };
  

  
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
        <table className="table-fixed">
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
            {sprintItems.map((item, index) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-sm">
                  <select
                    value={item.type}
                    onChange={(e) => setSprintItems(prevState => {
                      const updatedItems = [...prevState];
                      updatedItems[index].type = e.target.value;
                      return updatedItems;
                    })}
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  >
                    <option value="">{item.Type}</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Telegram">Telegram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Duolingo">Duolingo</option>
                    <option value="Games">Games</option>
                    <option value="Others">Others</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs">
                  <div className="mt-2">
                    <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="Low"
                        checked={item.difficulty === 'Low'}
                        onChange={(e) => setSprintItems(prevState => {
                          const updatedItems = [...prevState];
                          updatedItems[index].difficulty = e.target.value;
                          return updatedItems;
                        })}
                      />
                      <span className="ml-2">Low</span>
                    </label>
                    <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="Medium"
                        checked={item.difficulty === 'Medium'}
                        onChange={(e) => setSprintItems(prevState => {
                          const updatedItems = [...prevState];
                          updatedItems[index].difficulty = e.target.value;
                          return updatedItems;
                        })}
                      />
                      <span className="ml-2">Medium</span>
                    </label>
                    <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="High"
                        checked={item.difficulty === 'High'}
                        onChange={(e) => setSprintItems(prevState => {
                          const updatedItems = [...prevState];
                          updatedItems[index].difficulty = e.target.value;
                          return updatedItems;
                        })}
                      />
                      <span className="ml-2">High</span>
                    </label>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <textarea
                    value={item.Comment}
                    onChange={(e) => setSprintItems(prevState => {
                      const updatedItems = [...prevState];
                      updatedItems[index].comment = e.target.value;
                      return updatedItems;
                    })}
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    rows="3"
                    placeholder="Enter some long form content."
                  />
                </td>
                <td className="px-4 py-3 text-sm">
                  <DatePicker
                    placeholderText={item.Date}
                    selected={item.selectedDate}
                    onChange={date => setSprintItems(prevState => {
                      const updatedItems = [...prevState];
                      updatedItems[index].selectedDate = date;
                      return updatedItems;
                    })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
     
  

      <div className="px-6 my-6">
  <div className="flex space-x-4">
      <button onClick={handleUpdate} className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-800">
        Prioritize Task
        <span className="ml-2" aria-hidden="true">+</span>
      </button>
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