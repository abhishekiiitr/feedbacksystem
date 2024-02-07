import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Get_all_feedbackpage from './pages/Get_all_feedbackpage'
import Submit_feedback from './pages/Submit_feedback'


function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" Component={Home} />
        <Route path="/submit-feedback" Component={Submit_feedback} />
        <Route path="/display-feedback" Component={Get_all_feedbackpage}/>
      </Routes>
    </Router>
  );
}

export default App;
