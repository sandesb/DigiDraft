import axios from 'axios';

export const addBack = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/users', data)
          .then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          })
    });
  }

  export const addBackFromExcel = (jsonDataArray) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/users', jsonDataArray)
            .then(() => {
                resolve(true); // Resolve promise if successful
            })
            .catch((err) => {
                reject(err); // Reject promise with error if request fails
            });
    });
  };
// api-service.js

// Function to get the backlog data
export const getBack = async () => {
    try {
      const response = await fetch('path/to/back.json');
      const data = await response.json();
  
      // Update sprint property based on selected IDs
      const selectedIds = getSelectedIdsFromLocalStorage(); // Implement this function to get the selected IDs
      if (selectedIds && selectedIds.length > 0) {
        data.users.forEach(user => {
          if (selectedIds.includes(user.id)) {
            user.sprint = true;
          } else {
            user.sprint = false;
          }
        });
      }
  
      return data.users;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  