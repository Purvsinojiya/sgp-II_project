import React from 'react'
import "./nav.css"
import {AiOutlineSearch} from "react-icons/ai"

const nav = () => {
  return (
    <nave className='main-nav'>
      <div className="logo">
          <h2>
            <span>S</span>hivam
            <span>E</span>nterprice
            
          </h2>
        </div>
    
    <div className='menu-link'>
<ul>
    <li><a href="/home">home</a></li>
    <li><a href="/about">about</a></li>
    <li><a href="/login">Login</a></li>
</ul>
    </div>
    <div className='searchbar'>
    <AiOutlineSearch className='px'/>
        <input type="search" placeholder="search the product"></input>
    </div>
    </nave>
  )
}

export default nav
