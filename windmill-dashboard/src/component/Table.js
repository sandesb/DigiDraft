import React, { useEffect, useState } from 'react';
import { getBack } from '../service/api';
import { Link } from 'react-router-dom';

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users to display per page
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [backlogItems, setBacklogItems] = useState([]);

  useEffect(() => {
    getBack()
      .then(data => {
        setUserData(data);
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

  const handleSendToSprint = () => {
    // Filter userData to get only selected items
    const selectedItems = userData.filter(item => selectedItemIds.includes(item.id));
    // Send selected items to Sprint component
    // You can use a router to navigate to the Sprint component and pass selectedItems as props
  };


  const handleDeleteSprintItems = () => {
    const updatedBacklogItems = backlogItems.filter(item => !item.sprint);
    setBacklogItems(updatedBacklogItems);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
            {userData.map((user) => (
              <tr key={user.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td className="px-4 py-3">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3">
          Showing {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, userData.length)} of {userData.length}
        </span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              {/* Render pagination buttons dynamically */}
              {Array.from({ length: Math.ceil(userData.length / usersPerPage) }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple
                    ${currentPage === i + 1 ? 'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600' : ''}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastUser >= userData.length}
                  className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>

                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
      {selectedItemIds && (
      <Link to={`/Sprint/${selectedItemIds.join(',')}`} className="block text-center mt-4 text-purple-600 hover:underline">
      Go to Sprint
      </Link>
      )}
    </div>
  );
};

export default Table;
