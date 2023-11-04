import express from 'express';
// Cross-Origin Resource Sharing
import cors from 'cors';
// Multer is a middleware for handling multipart/form-data requests in Node.js
import multer from 'multer';
import pkg from 'pg';
const { Client } = pkg;

const app = express()
// Parse JSON bodies for API requests
app.use(express.json())
// Parse URL-encoded bodies for form submissions
app.use(express.urlencoded({ extended: true }));
// A middleware function that enables CORS for requests coming from a specific origin
app.use(cors({origin: 'http://localhost:3000'}));

// Set up multer storage and upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const client = new Client({
	user: 'kim',
	host: 'database',
	database: 'db',
	password: '2003',
	port: 5432,
})

// Await is used to pause the execution of a function until a promise is resolved or rejected
// Await can only be used inside an asynchronous function
await client.connect()

app.post('/a', upload.any(), async (req, res) => {
	// Check the received request body in the server console
	console.log(req.body)
	
	var data = await client.query(
		'SELECT role FROM account WHERE email=\'' + req.body.email + '\' AND password=\'' + req.body.password + '\''
	).then(()=>{res.send(true) },(error)=>{res.send(false)})
	
})
app.post('/h',upload.any(),async (req,res)=>{


	const {huyName} = req.body;
	res.json({data:`${huyName} N.huy`});

})
// A route handler will be executed for any HTTP GET request that does not match any other defined routes
app.get('*', (req, res) => {
	var x = new Promise((res,rej)=>{
		rej(new Error());
	})
	res.send('404 Page Not Found');
})


// Start the server
app.listen(4000, () => {
	console.log('Server is running on port 4000')
})

// Unknow???
// await client.end()