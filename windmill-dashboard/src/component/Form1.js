import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addBack } from '../service/api';
import { addBackFromExcel } from '../service/api';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

function Form1() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      id: uuidv4(), // Generate a unique ID for the user
      name: name
    };

    // Call the addUser function to send the data to the server
    addBack(userData)
      .then(() => {
        console.log('User added successfully');
        // Optionally, you can reset the form fields here
        setName("");
      })
      .catch((err) => {
        console.error('Error adding user:', err);
        // Handle error if the addUser function fails
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = async function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        const jsonDataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
        const successfulPosts = [];
  
        // Loop through each row in the jsonDataArray
        for (let i = 0; i < jsonDataArray.length; i++) {
          const row = jsonDataArray[i];
          const name = row[0] || ""; // Extract data from column 1 (index 0)
  
          if (name.trim() !== "") { // Ensure data is not empty
            const user = {
              "id": uuidv4(), // Generate unique ID for each user
              "name": name
            };
  
            try {
              await addBackFromExcel(user);
              successfulPosts.push(user);
            } catch (error) {
              console.error('Error posting user data:', error);
              // Handle error if post request fails
            }
          }
        }
  
        const numberOfStudents = successfulPosts.length;
        Swal.fire({
          title: `Congratulations. ${numberOfStudents} students added!`,
          position: "top-center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
  
        console.log('Successful posts:', successfulPosts);
        console.log('Users data from Excel processed successfully');
      };
  
      reader.readAsBinaryString(file);
    }
  };
  

  return (
    <div className="px-6 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 wid">
      <form onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Name</span>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="Jane Doe"
          />
        </label>



        <button type="submit" className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Ok</button>
     
        <div className="mt-4">
  <label className="block text-sm">
    <span className="text-gray-700 dark:text-gray-400">Upload Excel File</span>
    <div className="relative">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="hidden" // Hide the default input
        id="fileInput" // Add an ID to reference it later
      />
      <label htmlFor="fileInput" className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg cursor-pointer active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
        Browse
      </label>
    </div>
  </label>

        

      </div>
      </form>
    </div>
  );
}

export default Form1;

