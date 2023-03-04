import React from 'react'
import Prenavbar from './Prenavbar';
import './login.css'

function login() {
  return (
    <div>
       <Prenavbar />
      <div className='ba'>
        <div className='la'>
        <h1>Login</h1>
        <div className='j'>
         <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required/>
        
    <button type="submit">Login</button>
    <label className='x'>
    click here to sign up
    </label>
  </div>
  </div>


        </div>
      </div>
    </div>
  )
}

export default login
