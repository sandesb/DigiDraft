import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllData, getBack, updateSprintItems } from '../service/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const Sprint = () => {
  const [sprintItems, setSprintItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const { ids } = useParams();

  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState('');

useEffect(() => {
    if (ids) {
      const selectedIds = ids.split(',');
      getBack()
        .then(data => {
          const sprintData = data.filter(item => selectedIds.includes(item.id));
          // Initialize progress fields if they don't exist
          sprintData.forEach(item => {
            item.progressThumbnail = item.progressThumbnail || false;
            item.progressEdited = item.progressEdited || false;
          });
          setSprintItems(sprintData);
        })
        .catch(error => {
          console.error('Error fetching sprint data:', error);
        });
    }
  }, [ids]);

  useEffect(() => {
    getAllData()
      .then(data => {
        const sprintData = data.filter(item => item.sprint);
        // Initialize progress fields if they don't exist
        sprintData.forEach(item => {
          item.progressThumbnail = item.progressThumbnail || false;
          item.progressEdited = item.progressEdited || false;
        });
        setSprintItems(sprintData);
      })
      .catch(error => {
        console.error('Error fetching sprint data:', error);
      });
  }, []);
  const handleUpdate = async () => {
    try {
      const itemUpdates = sprintItems.map(item => ({
        id: item.id,
        Type: item.Type,
        Difficulty: item.Difficulty,
        Comment: item.Comment,
        Date: item.selectedDate ? item.selectedDate.toISOString().split('T')[0] : null,
        progressThumbnail: item.progressThumbnail,
        progressEdited: item.progressEdited,
      }));
  
      await updateSprintItems(itemUpdates);
  
      alert('Sprint items updated successfully');
    } catch (error) {
      console.error('Error updating sprint items:', error);
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

  const handleCheckboxChange = (index, detailType) => {
    setSprintItems(prevState => {
      const updatedItems = [...prevState];
      updatedItems[index] = { ...updatedItems[index], [detailType]: !updatedItems[index][detailType] };
      return updatedItems;
    });
  };

  const hey = () =>{
    <p>nice</p>
  }
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table-fixed">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Progress</th> {/* New column */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {sprintItems.map((item, index) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3">       <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
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
                      
                      </p>
                    </div>
                
                </td>
                
     
                <td className="px-4 py-3 text-xs">
                  <div className="mt-2">
                    <label className="flex items-center text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        className="text-orange-500 form-radio focus:border-orange-400 focus:outline-none focus:shadow-outline-orange dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="Low"
                        checked={item.Difficulty === 'Low'}
                        onChange={(e) => setSprintItems(prevState => {
                          const updatedItems = [...prevState];
                          updatedItems[index].difficulty = e.target.value;
                          return updatedItems;
                        })}
                      />
                      <span className="ml-2">Low</span>
                    </label>
                    <label className="flex items-center text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        className="text-blue-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="Medium"
                        checked={item.Difficulty === 'Medium'}
                        onChange={(e) => setSprintItems(prevState => {
                          const updatedItems = [...prevState];
                          updatedItems[index].difficulty = e.target.value;
                          return updatedItems;
                        })}
                      />
                      <span className="ml-2">Medium</span>
                    </label>
                    <label className="flex items-center text-gray-600 dark:text-gray-400">
                      <input
                        type="radio"
                        
                        className="text-red-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        name={`difficulty-${item.id}`}
                        value="High"
                        checked={item.Difficulty === 'High'}
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
                   placeholderText={item.Date ? item.Date : "Add Date 📅"}
                    selected={item.selectedDate}
                    onChange={date => setSprintItems(prevState => {
                      const updatedItems = [...prevState];
                      updatedItems[index].selectedDate = date;
                      return updatedItems;
                    })}
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-input focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  />
                </td>
                <td className="px-4 py-3 text-sm">
                
                <div>
                    <label className="inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={item.progressThumbnail || false}
                        onChange={() => handleCheckboxChange(index, 'progressThumbnail')}
                      />
                      <span className="ml-2">Thumbnail</span>
                    </label>
                    <label className="inline-flex items-center mt-3 ml-6">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={item.progressEdited || false}
                        onChange={() => handleCheckboxChange(index, 'progressEdited')}
                      />
                      <span className="ml-2">Edited</span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Sprint;
