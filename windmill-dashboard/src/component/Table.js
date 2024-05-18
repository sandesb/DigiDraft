import React, { useEffect, useState } from 'react';
import { getBack, updateSprint } from '../service/api';
import { Link } from 'react-router-dom';

const Table = () => {
  const [nonTickedItems, setNonTickedItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    getBack()
      .then(data => {
        const nonTicked = data.filter(item => !item.sprint);
        setNonTickedItems(nonTicked);
      })
      .catch(error => {
        alert('API error');
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItemIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(itemId)) {
        return prevSelectedIds.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedIds, itemId];
      }
    });
  };

  const handleSendToSprint = async () => {
    try {
      // Update the sprint status of selected items to true
      await updateSprint(selectedItemIds, true);
      // After updating, navigate to the Sprint component
      // You can use a router to navigate or redirect
    } catch (error) {
      console.error('Error sending items to Sprint:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Select</th>
              <th className="px-4 py-3">Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {nonTickedItems.map((item) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td className="px-4 py-3">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItemIds && (
      <Link to={`/Sprint/${selectedItemIds.join(',')}`} onClick={handleSendToSprint} className="block text-center mt-4 text-purple-600 hover:underline">
      Go to Sprint
      </Link>
      )}
    </div>
  );
};

export default Table;
