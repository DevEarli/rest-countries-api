import React from 'react'
import {
    Link,
  } from "react-router-dom";
  import NumberFormat from 'react-number-format';


function Card({data}) {
    return (
        <Link to={
            {
                pathname: `/detail/${data.name}`,
                state: {
                    name : data.name
                }
                
            }
        }>
        <div className="card">
            
            <img src={data.flag} alt=""/>
            <div className="content">
                <h3>{data.name}</h3>
                <p><span className="text-bold">Population:</span> <NumberFormat value={data.population} displayType={"text"} thousandSeparator={true}/></p>
                <p><span className="text-bold">Region:</span> {data.region}</p>
                <p><span className="text-bold">Capital:</span> {data.capital}</p>
            </div>
        </div>
        </Link>
    )
}

export default Card
