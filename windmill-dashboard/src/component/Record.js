import React, { useEffect, useState } from 'react';
import { getUploadedDetails } from '../service/api';

const typeToImageUrl = {
  Facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  Instagram: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  Twitter: 'https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg',
  LinkedIn: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  Others: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Noto_Emoji_Oreo_1f4a3.svg/150px-Noto_Emoji_Oreo_1f4a3.svg.png',
  Snapchat: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/419px-Snapchat_logo.svg.png?20190813231721',
  Duolingo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Duo_from_Duolingo.svg/330px-Duo_from_Duolingo.svg.png',
  Games: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/90px-WPVG_icon_2016.svg.png'
};

const getImageUrl = (type) => {
  return typeToImageUrl[type] || typeToImageUrl['Others'];
};

const Record = () => {
  const [uploadedItems, setUploadedItems] = useState([]);

  useEffect(() => {
    const fetchUploadedDetails = async () => {
      try {
        const data = await getUploadedDetails();
        setUploadedItems(data);
      } catch (error) {
        console.error('Error fetching uploaded details:', error);
      }
    };

    fetchUploadedDetails();
  }, []);

    //Pagination Function
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
  
     // Calculate total number of pages
     const totalPages = Math.ceil(uploadedItems.length / itemsPerPage);
  
     // Calculate index of the first and last item to display on the current page
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   
     // Get current items to display
     const currentItems = uploadedItems.slice(indexOfFirstItem, indexOfLastItem);
   
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
      <div className="wid overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {currentItems.map((item, index) => (
              <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={getImageUrl(item.Type)}
                        alt={item.Type}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.Type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{item.Date || 'Hey'}</td>
                <td className="px-4 py-3 text-sm">
                  <label className="inline-flex items-center mt-3">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={item.progressThumbnail || false}
                      readOnly
                    />
                    <span className="ml-2">Thumbnail</span>
                  </label>
                  <label className="inline-flex items-center mt-3 ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={item.progressEdited || false}
                      readOnly
                    />
                    <span className="ml-2">Edited</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Pagination */}
<div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex items-center col-span-3">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, uploadedItems.length)} of {uploadedItems.length}
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
  );
};

export default Record;
