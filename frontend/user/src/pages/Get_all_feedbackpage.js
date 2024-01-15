import React, { useState, useEffect } from 'react'
import './Get_all_feedbackpage.css'
const Get_all_feedbackpage =  ()=> {
    const [data,setData] = useState([]);
    useEffect(() => {
        const apiUrl = 'http://localhost:3001/get-ideas';
        fetch(apiUrl)
          .then(response => response.json())
          .then(resultData => {
            setData(resultData);
            console.log(data) 
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
  return (
    <div className="feedback-container">
      <ul className="feedback-list">
        {data.map(item => (
          <li key={item.id} className="feedback-item">
            <div className="feedback-content">
              <h4 className="feedback-title">Category: {item.name}</h4>
              <p className="feedback-description">{item.description}</p>
              <p className="feedback-description">Rating {item.cover_image}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Get_all_feedbackpage;
