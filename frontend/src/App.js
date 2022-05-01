import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' //allows us to route different pages
import Home from './pages/home'
import Eosio from './pages/eosio'
import BSV from './pages/bitcoinSV'
function App() {
  //creating all routes for the different pages.
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />}/>
        <Route path="/Eosio" element={<Eosio />}/>
        <Route path="/BitcoinSV" element={<BSV />}/>
      </Routes>
    </Router>
  );
}

export default App;