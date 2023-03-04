import React from 'react'
import Prenavbar from "./Prenavbar";
import './producat3.css'
import Nav from './nav.js';
function producat3() {
  return (
    <>
    <Prenavbar />
    <Nav />
    <div className='main'>
    <div className='part-1'>
      <img src="https://5.imimg.com/data5/ANDROID/Default/2021/8/WJ/GT/FK/28332008/product-jpeg-250x250.jpg" alt="" />
    </div>
    <div className='part-2'>
    <div className='p11'>
    <h1>Vachrash Arecanut</h1>
    </div>
    <div className='p22'>
    Rupee  650 per 1 kg
    </div>
   <div className='p33'>
    Enriched by our vast industrial experience in this domain,we are into presenting an excellentuality range of Vachrash Areca Nut to our customers. This Vachrash Areca Nut is widely acclaimed for various religious, social and cultural functions and events in India.<br/> Offeredproduct is tested on numerous quality stages by experts.
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

export default producat3
