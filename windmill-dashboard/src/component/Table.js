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

    //Pagination Function
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Number of items to display per page
  
     // Calculate total number of pages
     const totalPages = Math.ceil(nonTickedItems.length / itemsPerPage);
  
     // Calculate index of the first and last item to display on the current page
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   
     // Get current items to display
     const currentItems = nonTickedItems.slice(indexOfFirstItem, indexOfLastItem);
   
     // Function to handle pagination button click
     const handleClick = (type) => {
       if (type === 'prev') {
         setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
       } else if (type === 'next') {
         setCurrentPage(currentPage === totalPages ? totalPages : currentPage + 1);
       }
     };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-xs  table-fixed font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-2 py-3 w-2">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Sprint</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {currentItems.map((item,index) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                             <td className="px-4 py-3 text-sm">{indexOfFirstItem + index + 1}</td>

         
                <td className="px-4 py-3">{item.name}</td>

                <td className="px-4 py-3 w-3">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
<div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex items-center col-span-3">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, nonTickedItems.length)} of {nonTickedItems.length}
      </span>
      <span className="col-span-2"></span>
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button
                className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Previous"
                onClick={() => handleClick('prev')}
                disabled={currentPage === 1}
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
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                    currentPage === i + 1 ? 'text-white bg-purple-600 border border-r-0 border-purple-600 rounded-md' : ''
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Next"
                onClick={() => handleClick('next')}
                disabled={currentPage === totalPages}
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
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
