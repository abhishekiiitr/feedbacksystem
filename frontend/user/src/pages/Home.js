import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className='upper_div'>
      <div className='first_div'>
        <Link to="submit-feedback" className='a'> Log in</Link>
      </div>
      <div className='second_div'>
        <Link to="submit-feedback" className='b'> Submit feedback</Link>
        <Link to="display-feedback" className='c'> Get all feedback </Link>
      </div>
    </div>
  )
}

export default Home
