import React from 'react'
import { Link} from 'react-router-dom';
import '../css/login.css'

const Login = () => {
  return (
    <div className='body1'>
      <div className="box1">
        <h1>Welcome to the World of Movies – Continue, Explore, Enjoy!</h1>
      </div>
      <div className="box2">
        <form action="">
            <h2>Log in</h2>
            <div className="ipbox">
                <img src="../svg/person-outline.svg" alt="xx" className='svg2'/>
                <input type="text" name='user' required/>
                <label htmlFor="user">Username</label>
            </div>
            <div className="ipbox">
  
                    <img src="../svg/lock-closed-outline.svg" alt="xx" className='svg2'/>

                    <input type="password" name='pass' required/>
                    <label htmlFor="pass">Password</label>
        
            </div>

            <button>Log in</button>

            <div className="register">
                <p>Don't have a account <Link to="/register">Register</Link> </p>
            </div>
        </form>
      </div>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
  )
}

export default Login
