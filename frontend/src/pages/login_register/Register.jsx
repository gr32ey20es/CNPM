import Tilt from "react-parallax-tilt";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import './dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './dependencies/vendor/animate/animate.css';
import './dependencies/vendor/css-hamburgers/hamburgers.min.css';
import './dependencies/vendor/select2/select2.min.css';
import './dependencies/css/util.css';
import './dependencies/css/main.css';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(inputs);
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    };

  	return(
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100">
					<div className="login100-pic js-tilt" data-tilt>
						<Tilt scale={1.1}>
							<img src={require("./dependencies/images/img-01.png")} alt="IMG"/>
						</Tilt>
					</div>

					<form className="login100-form validate-form">
						<span className="login100-form-title">
							User Register
						</span>

						<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
							<input className="input100" type="text" name="email" placeholder="Email" onChange={handleChange}/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i className="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>

						<div className="wrap-input100 validate-input" data-validate = "Password is required">
							<input className="input100" type="password" name="password" placeholder="Password" onChange={handleChange}/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i className="fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid account is required">
							<input className="input100" type="text" name="username" placeholder="Account" onChange={handleChange}/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
							</span>
						</div>
						
						<div className="container-login100-form-btn">
							<button className="login100-form-btn" onClick={handleSubmit}>
								Register
							</button>
						</div>

						<div className="text-center p-t-136">
							<Link to="/login" className="txt2">
                                Already have an account?
								<i className="fa fa-arrow-circle-right m-l-5" aria-hidden="true"></i>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;