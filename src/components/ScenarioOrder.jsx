import React, { useState, useEffect } from 'react';
import '../css/ScenarioOrder.css';

const ScenarioOrder = ({ onOrderChange }) => {
  const [order, setOrder] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: ''
  });
  // Use useEffect to update parent when order changes
  useEffect(() => {
    onOrderChange(order); // Call parent callback after state is set
    console.log("Order received from child:", order); // Log after the update
  }, [order, onOrderChange]); // Trigger when 'order' changes

  const handleChange = (event, position) => {
    const { value } = event.target;
    setOrder(prevOrder => {
      const newOrder = {
        ...prevOrder,
        [position]: value
      };
      console.log('Updated Order:', newOrder);  // Log the updated order
      return newOrder;
    });
  };

  return (
    <div className="scenario-container">
      <div className="form-container">
        <h2>Please order the scenarios from the best to worst:</h2>
        <form>
          {['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'].map((position, index) => (
            <div key={position}>
              <label>{index + 1}st:</label>
              <select value={order[position]} onChange={(e) => handleChange(e, position)}>
                <option value="">Select Scenario 1-7</option>
                {[...Array(7).keys()].map(i => (
                  <option key={i} value={`Scenario ${i + 1}`}>
                    Scenario {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </form>
      </div>

      <div className="result-container">
        <h3>Selected Order:</h3>
        <ul>
          {Object.entries(order).map(([key, value]) => (
            value && <li key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScenarioOrder;
