import React, { useState }  from 'react';
import func from './axiosConfig';

function Login() {
    const [data, setData] = useState([
    {
        count: 1
    }
    ]);

    return(
    <>
        <button onClick={() => func.function$1(data, setData)}>Click</button>
        {data.map(d => <div>{JSON.stringify(d)}</div>)}
    </>
    )
}

export default Login;