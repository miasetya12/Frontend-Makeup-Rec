import React, { useState, useEffect } from 'react';
import '../css/ScenarioOrder.css';

const ScenarioOrder = ({ onOrderChange }) => {
  const [order, setOrder] = useState({
    pertama: '',
    kedua: '',
    ketiga: '',
    keempat: '',
    kelima: '',
    keenam: '',
    ketujuh: ''
  });
  
  
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
   {/* <h3>Order the scenarios from the best to worst:</h3> */}
   {/* <p>Bisa memberikan urutan berdasarkan evaluation summarynya, apakah menilai dari kerelevanan atau bisa mepertimbangkan berdasarkan urutan rekomendasi</p> */}

  
  <form className="grid-container">
    {['Pertama', 'Kedua', 'Ketiga', 'Keempat', 'Kelima', 'Keenam', 'Ketujuh'].map((ordinal, index) => (
      <div className="grid-item" key={ordinal}>
        <label>{ordinal}</label>
        <select value={order[ordinal.toLowerCase()]} onChange={(e) => handleChange(e, ordinal.toLowerCase())}>
          <option value="">Pilih Skenario 1-7</option>
          {[...Array(7).keys()].map(i => (
            <option key={i} value={`Scenario ${i + 1}`}>
              Skenario {i + 1}
            </option>
          ))}
        </select>
      </div>
    ))}
  </form>

 <div style={{ textAlign: "center" }}>
                    <p><b>Setelah semua terisi, klik Simpan Evaluasi</b></p>
                </div>
    </div>
  );
};

export default ScenarioOrder;
