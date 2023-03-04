import React from 'react'
import "./off.css"
const off = ({index,src,link,name,price}) => {
  return (
  <div className="off">
   <a href={link}> <img src={src} alt={`${index}offer`} /></a>
   <p>{name}</p>
   <span>{price}</span>
   </div>
  )
}
export default off
