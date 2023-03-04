import React from 'react'
import Prenavbar from "./Prenavbar";
import './producat1.css'
import Nav from './nav.js';
function producat1() {
  return (
    <>
    <Prenavbar />
    <Nav />
    <div className='main'>
    <div className='part-1'>
      <img src="https://4.imimg.com/data4/PP/TA/NSDMERP-14462109/arecanuts-500x500.png" alt="" />
    </div>
    <div className='part-2'>
    <div className='p11'>
    <h1>Sevradhan Arecanut</h1>
    </div>
    <div className='p22'>
    Rupee  650 per 1 kg
    </div>
   <div className='p33'>
    Enriched by our vast industrial experience in this domain,we are into presenting an excellentuality range of Sevardhan Areca Nut to our customers. This Sevardhan Areca Nut is widely acclaimed for various religious, social and cultural functions and events in India.<br/> Offeredproduct is tested on numerous quality stages by experts.
    <br/> Features:<br/> 
- Outstanding freshness<br/> 
- Good quality<br/> 
- Rich taste<br/> 
</div>

    </div>
    
    </div>
    <div className='part-3'>
    <button>BUY</button>
    <button>Add to cart</button>
</div>
    </>
  )
}

export default producat1
