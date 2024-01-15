import React, { useState } from 'react'
import './Submit_feedback.css';
import { useLocation } from 'react-router-dom';

export default function Submit_feedback(props) {
    const [cat,setCat] = useState("");
    const [des,setDes] = useState("");
    const [rating, setRating] = useState(5);
    const [check, setCheck] = useState(false);
    const location = useLocation();
    const user = location.state.name
    const click1 = () =>{
        setCat("Product Features")
    }
    const click2 = () =>{
        setCat("Product Prices")
    }
    const click3 = () =>{
        setCat("Product usability")
    }
    const handleRatingChange = (event) => {
      const newRating = parseInt(event.target.value, 10);
      setRating(newRating);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("aaya")
        const payload = {
            name: cat,
            description: des+" Given by "+user,
            cover_image:rating,
            approval_status: "approved", 
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
            setCheck(true)
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
      <label htmlFor="rating">Rating:</label>
      <input type="range" id="rating" name="rating" min="1" max="10" value={rating} onChange={handleRatingChange} />
      <p>Selected Rating: {rating}</p>
        <textarea className="input" type='text' value={des} onChange={(e) => { setDes(e.target.value) }} placeholder='Leave a Comment' />
        <button onClick={handleSubmit}>Submit</button>
        {check?<p>Data sent successfully</p>:null}
      </div>
    </div>
  )
}
