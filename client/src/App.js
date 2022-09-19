import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import LandingPage from "./components/LandingPage"
import DogCreate from "./components/DogCreate"
import DogDetail from "./components/DogDetail"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
       <Route exact path= '/' element= {<LandingPage/>}/>
       <Route path = '/home' element= {<Home/>} />
       <Route path = '/raze' element= {<DogCreate/>} />
       <Route path = '/razes/:id' element= {<DogDetail/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
