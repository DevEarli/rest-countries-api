import React,{useState,useEffect} from 'react'
import {FaArrowLeft} from "react-icons/fa"
import axios from "axios";
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Borders from './Borders';

const Detail = (props) =>{
    const [data,setData] = useState([]);
    const [allBorder,setAllBorder] = useState([]);

    const name = props.location.state.name;

    useEffect(() => {
        setAllBorder([]);
        const getDetails = async () => {
            const response =  await axios.get(`https://restcountries.eu/rest/v2/name/${name}`);
            const result  = await response.data[0];
            const {borders} = result;

            setData({...result,
                currencies : result.currencies.map(a => a.name).join(','),
                languages: result.languages.map(a => a.name).join(','),
            })

            console.log(data);

            const border = borders.join(';');
            const responseBorder = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${border}`);
            const dataBorder = await responseBorder.data;
            
            console.log(dataBorder);
            
            setAllBorder([...dataBorder]);
        }

        getDetails();

    }, [name])


  

    return (
        <div className="container">
            <Link to="/">
            <button className="back-button">
                <FaArrowLeft/>
                <p>Back</p>
            </button>
            </Link>

            <main className="main-details">
                <div className="flag">
                <img src={data.flag} alt=""/>
                </div>
    

                <div className="detail">
                    <h2>{data.name}</h2>
                    <div className="content">
                        <div className="left">
                            <p><span className="text-bold">Native Name:</span> {data.nativeName}</p>
                            <p><span className="text-bold">Population:</span> <NumberFormat value={data.population} displayType={"text"} thousandSeparator={true}/></p>
                            <p><span className="text-bold">Region:</span> {data.region}</p>
                            <p><span className="text-bold">Sub Region:</span> {data.subregion}</p>
                            <p><span className="text-bold">Capital:</span> {data.capital}</p>
                        </div>

                        <div className="right">
                            <p><span className="text-bold">Top Level Domain:</span> {data.topLevelDomain}</p>
                            <p><span className="text-bold">Currencies:</span> {data.currencies}</p>
                            <p><span className="text-bold">Languages:</span> {data.languages}</p>

                        </div>
                    </div>

                    <div className="borders">
                        <p className="text-bold">Border Countries: </p>
                            {allBorder.map((a,i) => (
                                <Borders key={i} value={a.name}/>
                            ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Detail
