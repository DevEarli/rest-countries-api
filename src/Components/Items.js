import React from 'react'

function Items({dropDown,All}) {
    const menu = ['Africa','Americas','Asia','Europe','Oceania'];
    
    return (
        <div className="items">
            <p onClick={() => All()}>All</p>
            {menu.map(a => <p onClick={() => dropDown(a)}>{a}</p>)}
        </div>
    )
}

export default Items
