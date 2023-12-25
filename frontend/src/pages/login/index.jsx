import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import { AuthContext } from "../../context/authContext";

import './dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './dependencies/vendor/animate/animate.css';
import './dependencies/vendor/css-hamburgers/hamburgers.min.css';
import './dependencies/vendor/select2/select2.min.css';
import './dependencies/css/util.css';
import './dependencies/css/main.css';

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			[e.target.name]: e.target.value,
		}));
	};
  
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!inputs.email || !inputs.password) {
			setError("Vui lòng nhập tên người dùng và mật khẩu");
			return;
		}
		try {
			await login(inputs);
			navigate("/");
		} catch (err) {
			setError("Tên người dùng hoặc mật khẩu không tồn tại");
		}
		console.log(error)
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
						<span style={{fontFamily: 'sans-serif', fontWeight: 700, paddingBottom: 30}} className="login100-form-title">
							Tài khoản thành viên
						</span>

						<div style={{width: '100%', textAlign: "center", height: 40}}>
							<span style={{fontSize: '12px', color: 'red'}}>{error}</span>
						</div>

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
						
						<div className="container-login100-form-btn">
							<button className="login100-form-btn" onClick={handleSubmit}>
								Đăng nhập
							</button>
						</div>

						<div className="text-center p-t-136">
							<Link to="#" className="txt2">
								Giấy phép
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