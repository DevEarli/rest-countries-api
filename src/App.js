import {useState,useEffect} from "react"
import {FaMoon} from "react-icons/fa"
import './App.css';
import Detail from './Components/Detail'
import axios from 'axios';
import Main from "./Components/Main";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";




export default function App() {
  const [darkMode,setDarkMode] = useState(false);
  const [state,setState] = useState([]);

  const getAllData = () =>{
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(res => {
      console.log(res.data);
      setState(res.data);
    });
  }

  const dropDownFilter = (value) =>{
    console.log(value);
    axios.get(`https://restcountries.eu/rest/v2/region/${value}`)
    .then(res => {
      setState(res.data);
    })
  }

  const changeTheme = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
        document.documentElement.style.setProperty('--Background',`${darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)"}`);
        document.documentElement.style.setProperty('--Elements',`${darkMode ? "hsl(209, 23%, 22%)" : "#fff"}`);
        document.documentElement.style.setProperty('--Text',`${darkMode ? "#fff" : "hsl(200, 15%, 8%)"}`);
  },[darkMode]);
  

  useEffect(() => {
    getAllData();
  },[]);

  return (
    <div className="App">
      <header>
          <div className="navbar">
              <h2>Where in the world?</h2>
              <div className="toggle" onClick={() => changeTheme()}>
                <FaMoon/>
                <p className="text-bold">Dark Mode</p>
              </div>
          </div>
      </header>
        <Router>
            <Route exact path="/"><Main state={state} setState={setState} All={getAllData} dropDown={dropDownFilter}/></Route>
            <Route path="/detail/:name" component={Detail}/>
        </Router>
        
    </div>
  );
}


