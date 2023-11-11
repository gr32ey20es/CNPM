import axios from 'axios'

// Create a new instance of the Axios client with custom configurations
const login = axios.create({timeout: 1000})
login.authentication = async (e, email, password, setCheck) => {
	// Prevent a page refresh on form submit in React
	e.preventDefault();	
	
	// Capture form data and send it as part of an HTTP request
	const userData = new FormData();
	userData.append('email', email);
	userData.append('password', password);

    const response = await login.post('http://localhost:4000/a', userData, {
		// For FromDatas()
		headers: {'Content-Type': 'multipart/form-data'}
	});

    setCheck(response['data']);
};
login.huyHandler = async (e,huyName,setHuyCheck)=>{
	e.preventDefault();
	const url = 'http://localhost:4000/h'
	const userData = new FormData();
	userData.append('huyName',huyName);
	
	const config = {
		headers:{'Content-Type':'multipart/form-data'}
	};
	const response = await login.post(url,userData,config);
	//console.log(response.data);
	setHuyCheck(response.data.data);
	console.log(response.data)
	
}

export default login;