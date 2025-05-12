import React from 'react'
import { Link} from 'react-router-dom';
import '../css/login.css'

const Register = () => {
  return (
    <div className='body1'>
      <div className="box1">
        <h1>Join the World of Movies – Discover, Experience, Belong!</h1>
      </div>
      <div className="box2">
        <form action="">
            <h2>Create Your Account</h2>
            <div className="ipbox">
                <input type="text" name='user' required/>
                <img src="../svg/person-outline.svg" alt="xx" className='svg2'/>
                <label htmlFor="user">Enter Username</label>
            </div>
            <div className="ipbox">
                <img src="../svg/lock-closed-outline.svg" alt="xx" className='svg2'/>
                <input type="password" name='pass' required/>
                <label htmlFor="pass">Enter Password</label>
            </div>

            <button>Continue</button>
            <div className="register">
                <p>Already registered? <Link to="/login">Login</Link> </p>
            </div>
        </form>
      </div>


    </div>
  )
}

export default Register
