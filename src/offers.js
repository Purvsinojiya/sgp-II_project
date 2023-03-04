import React from 'react'
import Offer from "./Offer.js"
import "./offers.css"


const Offers = ({offer}) => {
    return (
        <div className="offersSection"> 
        {offer.map((item,index)=>(
        <Offer key={item.image} index={index} src={item.image} link={item.url} name={item.name} price={item.price}
        />
        ))}
    </div>
    )
}

export default Offers