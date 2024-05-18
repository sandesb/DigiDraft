import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBack } from '../service/api';

const Sprint = () => {
  const [sprintItems, setSprintItems] = useState([]);
  const { ids } = useParams();

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
                <td className="px-4 py-3 text-sm"></td>
                <td className="px-4 py-3 text-xs">
                  <span>
                  </span>
                </td>
                <td className="px-4 py-3 text-sm"></td>
                <td className="px-4 py-3 text-sm"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sprint;
