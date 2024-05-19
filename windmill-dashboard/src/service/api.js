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

  export const getBack = () => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/users').then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  // api.js
  export const updateSprint = async (itemIds, sprintStatus) => {
    try {
      // Iterate over each item ID and update its sprint status
      for (const itemId of itemIds) {
        // Fetch the specific item data from the API
        const response = await fetch(`http://localhost:5000/users/${itemId}`, {
          method: 'PATCH', // Use PATCH method for updating existing items
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sprint: sprintStatus }), // Send the new sprint status
        });
  
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to update sprint status for item with ID ' + itemId);
        }
      }
    } catch (error) {
      // Handle errors
      console.error('Error updating sprint status:', error);
      throw error; // Re-throw the error to handle it in the calling component if needed
    }
  };

  export const updateSprintItems = async (itemUpdates) => {
    try {
      for (const itemUpdate of itemUpdates) {
        const { id, Type, Difficulty, Comment, Date } = itemUpdate;
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: 'PATCH', // Use PATCH method
          body: JSON.stringify({ Type, Difficulty, Comment, Date }), // Send only the updated fields
        });
        if (!response.ok) {
          throw new Error(`Failed to update item with ID ${id}`);
        }
      }
      return true; // Return true if all updates were successful
    } catch (error) {
      console.error('Error updating sprint items:', error);
      throw error;
    }
};

export const getAllData = async () => {
    try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


  
  