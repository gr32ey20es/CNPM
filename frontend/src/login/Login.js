import React, { useState }  from 'react';
import login from './axiosConfig';
import './Login.css';

function Login() {
    
    // State: store and manage data that may change over time
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState([]);
    const[huyName,setHuyName] = useState('');
    const[huyCheck,setHuyCheck] = useState('no response')
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

        
        <div id = "huy" style ={{position:"absolute",top:"10px",left:"10px",background:"#ff0000",
    "box-sizing":"border-box",height:"300px",width:"300px"}}>
            <form onSubmit={e=>{login.huyHandler(e,huyName,setHuyCheck)}}>
                <label htmlFor = 'edit_huy'>Di qua cho xin cai ten!!!</label>
                <input type = 'text' id = 'edit_huy' value = {huyName}   onChange = {(e)=>setHuyName(e.target.value)}/>
                <button type = 'submit'>Gui!!</button>
            </form>
            <h1 >{huyCheck}</h1>
        </div>
    </>
    )
}

export default Login;