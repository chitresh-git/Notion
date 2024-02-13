import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SingleItem from './components/SingleItem';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Contributers from './components/Contributers';
import Footer from './components/Footer';



function App() {


  return (
    <div>
 
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path='/'  element={<Home/>}/>
        <Route exact path='/expandpost'  element={<SingleItem/>}/>
        <Route exact path='/profile'  element={<Profile/>}/>
        <Route exact path='/contributor'  element={<Contributers/>}/>
        </Routes>

         <Footer/>
      </Router>
    </div>
  );
}


export default App;
