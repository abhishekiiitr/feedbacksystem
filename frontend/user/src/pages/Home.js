import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch('http://127.0.0.1:3001/request', { method: 'post' });
  const data = await response.json();
  console.log(data);
  navigate(data.url);

}

const Home = () => {

  const location = useLocation();
  const [name, setName] = useState("Login");
  const [user, setUser] = useState(false);
  const [image, setImage] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB&psig=AOvVaw3P-mXiTEiR9o2hgLXM1G1O&ust=1705242072700000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLjX3I_I2oMDFQAAAAAdAAAAABAE");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const payload = Object.fromEntries(searchParams.entries());
    setName(payload.name); 
    setUser(true);
    setImage(payload.picture)
    console.log('Received Payload:', payload);
    console.log(name)
  }, [location.search]);

  const cancel = () => {
    setUser(false);
    setName("Login");
  }

  const navigate = useNavigate();

  const send = () => {
    // Navigate to the Submit_feedback component with the name as a parameter
    navigate('/submit-feedback', { state: { name } });
  };

  return (
    <div className='upper_div'>
      <div className='first_div'>
        <div className="button-container">
        {user ? (
            <div className="user-info">
              <img src={image} alt="User" className="user-image" />
              <span className="user-name">{name}</span>
              <button onClick={cancel} className="logout-button">Logout</button>
            </div>
          ) : (
            <button onClick={auth} className={`login-button ${user ? 'user-logged-in' : ''}`}>
              <img
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="Google"
                className="google-image"
              />
              <span className="login-text">Login</span>
            </button>
          )}
        </div>

      </div>
      <div className='second_div'>
        {user?<button className='b' onClick={send}> Submit feedback</button>:null}
        <Link to="display-feedback" className='c'> Get all feedback </Link>
      </div>
    </div>
  )
}

export default Home
