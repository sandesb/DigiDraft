// Sprint.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBack } from '../service/api';

const Sprint = () => {
  const { ids } = useParams();
  const [sprintItems, setSprintItems] = useState([]);

  useEffect(() => {
    if (ids) {
      const selectedIds = ids.split(',').map(Number);
      getBack()
        .then(data => {
          const selectedItems = data.filter(item => selectedIds.includes(item.id));
          setSprintItems(selectedItems);
        })
        .catch(error => {
          console.error('Error fetching sprint items:', error);
        });
    }
  }, [ids]);

  return (
    <div>
      <h2>Sprint Items</h2>
      <ul>
        {sprintItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sprint;
