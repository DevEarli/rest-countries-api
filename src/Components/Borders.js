import React from 'react'
import {Link} from "react-router-dom"

function Borders({value}) {
    return (
            <Link to={
               {
                    pathname: `/detail/${value}`,
                    state: {
                    name: value
                    }
                                    
                }
            }>
                    <div className="border">{value}</div>
            </Link>
    )
}

export default Borders
