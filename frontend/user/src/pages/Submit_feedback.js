import React, { useState } from 'react'
import './Submit_feedback.css';

export default function Submit_feedback() {
    const [cat,setCat] = useState("");
    const [des,setDes] = useState("");
    let user = "Abhishek "
    const click1 = () =>{
        setCat("Product Features")
    }
    const click2 = () =>{
        setCat("Product Prices")
    }
    const click3 = () =>{
        setCat("Product usability")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("aaya")
        const payload = {
            name: cat,
            description: des+" Given by "+user,
            approval_status: "12345", 
            author_idx: "follower_7188vypj"
          };
        console.log(payload)
        try {
          const response = await fetch('http://localhost:3001/create-idea', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if (response.ok) {
            console.log('Data sent successfully!');
          } else {
            console.error('Failed to send data:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
    <div className="submit-feedback-container">
      <div className="category-buttons">
        <button onClick={click1}>Product Features</button>
        <button onClick={click2}>Product Prices</button>
        <button onClick={click3}>Product Usability</button>
      </div>
      <div className="feedback-input">
        <textarea className="input" type='text' value={des} onChange={(e) => { setDes(e.target.value) }} placeholder='Leave a Comment' />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
