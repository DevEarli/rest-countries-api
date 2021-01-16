import React,{useEffect, useState} from 'react'
import Card from './Card'
import {FaSearch,FaAngleDown} from "react-icons/fa"
import axios from 'axios';
import Items from './Items';

export default function Main({state,setState,showDetails,All,dropDown}) {
    const [error,setError] = useState(false);
    const [show,setShow] = useState(false);

    const handleChange = async (e) =>{
        let value = e.target.value;

          try {
            const response = await axios.get(`https://restcountries.eu/rest/v2/name/${value}`)
            const data = await response.data;
            console.log(data);
            setState(data);
            setError(false);
          }catch(error){
            console.log(error.response);
            setError(true);

            if(value === ""){
              All();
              setError(false);
            }

          }


    }

    const showItems = () => {
      setShow(!show);
    }

    useEffect(() =>{
      All();
    },[])
    
    return (
        <main>
        <div className="container">
            <div className="search-panel">
              <div className="search-box">
              <FaSearch/>
              <input onChange={handleChange} type="text" placeholder="Search for a country..."></input>
              </div>

              <div onClick={() => showItems()} className="dropdown">
                <p>Filter by Region</p>
                <FaAngleDown/>
                {show && <Items dropDown={dropDown} All={All}/>}
              </div>
            </div>

            {
            error ? <p className="error">404 not found</p> : 
            <div className="contents">
                {state.map(data => <Card data={data} showDetails={showDetails}/>)}
            </div>
            }
        </div> 
      </main>
    )
}

