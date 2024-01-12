import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Login from './pages/Login/indes';
import Home from './pages/Home/index';
import Signup from './pages/Signup';
import Get_all_feedbackpage from './pages/Get_all_feedbackpage'
import Submit_feedback from './pages/Submit_feedback'


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/"  Component={Home} />
        <Route path="/submit-feedback" Component={Submit_feedback} />
        <Route path="/display-feedback" Component={Get_all_feedbackpage}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
