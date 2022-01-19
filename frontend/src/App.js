import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' //allows us to route different pages
import Home from './pages/home'

function App() {
  //creating all routes for the different pages.
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;