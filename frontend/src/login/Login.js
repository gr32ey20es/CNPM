import React, { useState }  from 'react';
import login from './axiosConfig';
import './Login.css';

function Login() {
    
    // State: store and manage data that may change over time
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState([]);

    return(
    <>
        <img style={{width: "90px"}} src={require('./user-icon.png')} />

        <form id="login" className="column-center"
        onSubmit={(e) => login.authentication(e, email, password, setCheck)}>
            {/* Add email state */}
            <input type='text' value={email} placeholder='Email'
            //  Update the email state with the new value entered in the input field
            onChange={(e) => setEmail(e.target.value)} />
            <input type='text' value={password} placeholder='Password'
            onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>
        
        {/* Perhaps this can help you display the content of a server's response */}
        <p style={{width: "500px"}}>{JSON.stringify(check)}</p>
    </>
    )
}

export default Login;