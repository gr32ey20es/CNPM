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
	)
	if (data['rows'].length) res.send(true) 
	else res.send(false)
})

//Quan ly khoanthu
//tao khoan thu
app.post("/khoanthus", async(req,res) =>
{ 
try
{
 const {makt,tenkt,sotien,loaikt} = req.body;
 const result = await client.query(
	"INSERT INTO khoanthu (makt,tenkt,sotien,loaikt) VALUES ($1,$2,$3,$4) RETURNING *",
     [makt,tenkt,sotien,loaikt]
 );

 res.json(result.rows);
}
catch(err)
{
console.error(err.message);
}
}
)

//hien toan bo 
app.get("/khoanthus", async(req,res) =>
{ 
try
{
  const allresult = await client.query("SELECT * FROM khoanthu");
  res.json(allresult.rows);
}
catch(err)
{
console.error(err.message);
}
}
)

//search 
app.get("/khoanthus/:id", async(req,res) => {
	try
	{
		const {id} = req.params;
		const result = await client.query("SELECT * FROM khoanthu WHERE makt = $1",[id]);
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//cap nhap khoan thu 
app.put("/khoanthus/:id", async(req,res) =>
{
	try 
	{
		const{id} = req.params;
		const{tenkt,sotien,loaikt} = req.body;
		const result = await client.query(
			"UPDATE khoanthu SET tenkt = $1,sotien = $2, loaikt = $3 WHERE makt = $4 RETURNING *",
			[tenkt,sotien,loaikt,id]
		);
		res.json("update success")
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Xoa khoan thu 
app.delete("/khoanthus/:id", async(req,res) => 
{
	try 
	{
		const {id} = req.params;
		const deleteresult = await client.query(
			"DELETE FROM khoanthu WHERE makt = $1",
			[id]
		);
		res.json("delete success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Quan ly nhan khau
//Tao nhan khau
app.post("/nhankhaus", async(req,res) =>
{
	try 
	{
		const{cccd,ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep} = req.body;
		const result = await client.query (
			"INSERT INTO nhankhau (cccd,ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
			[cccd,ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep]
		)
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//hien toan bo nhan khau 
app.get("/nhankhaus",async(req,res) =>
{
	try 
	{
		const {cccd,ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep} = req.body;
		const allresult = await client.query(
			"SELECT * FROM nhankhau"
		);
		res.json(allresult.rows);
	}
	catch(err)
	{
		console.error(err.massage);
	}
}
)

//search nhan khau
app.get("/nhankhaus/:cccd", async(req,res) => {
	try
	{
		const {cccd} = req.params;
		const result = await client.query("SELECT * FROM nhankhau WHERE cccd like $1",[cccd]);
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//cap nhap nhan khau
app.put("/nhankhaus/:cccd", async(req,res) =>
{
	try 
	{
		const{cccd} = req.params;
		const{ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep} = req.body;
		const result = await client.query(
			"UPDATE nhankhau SET ten = $1,tuoi = $2, sdt = $3, gioitinh = $4, quequan = $5, dantoc = $6, tongiao = $7, nghenghiep = $8 WHERE cccd = $9 RETURNING *",
			[ten,tuoi,sdt,gioitinh,quequan,dantoc,tongiao,nghenghiep,cccd]
		);
		res.json("update success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Xoa nhan khau 
app.delete("/nhankhaus/:cccd", async(req,res) => 
{
	try 
	{
		const {cccd} = req.params;
		const deleteresult = await client.query(
			"DELETE FROM nhankhau WHERE cccd = $1",
			[cccd]
		);
		res.json("delete success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Quan ly ho khau
//Tao ho khau
app.post("/hokhaus", async(req,res) =>
{
	try 
	{
		const{maho,cccdchuho,sothanhvien,diachi} = req.body;
		const result = await client.query (
			"INSERT INTO hokhau (maho,cccdchuho,sothanhvien,diachi) VALUES($1,$2,$3,$4) RETURNING *",
			[maho,cccdchuho,sothanhvien,diachi]
		)
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//hien toan bo ho khau 
app.get("/hokhaus",async(req,res) =>
{
	try 
	{
		const {maho,cccdchuho,sothanhvien,diachi} = req.body;
		const allresult = await client.query(
			"SELECT * FROM hokhau"
		);
		res.json(allresult.rows);
	}
	catch(err)
	{
		console.error(err.massage);
	}
}
)

//search ho khau
app.get("/hokhaus/:id", async(req,res) => {
	try
	{
		const {id} = req.params;
		const result = await client.query("SELECT * FROM hokhau WHERE maho = $1",[id]);
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//cap nhap ho khau
app.put("/hokhaus/:id", async(req,res) =>
{
	try 
	{
		const{id} = req.params;
		const{cccdchuho,sothanhvien,diachi} = req.body;
		const result = await client.query(
			"UPDATE hokhau SET cccdchuho = $1,sothanhvien = $2, diachi = $3 WHERE maho = $4 RETURNING *",
			[cccdchuho,sothanhvien,diachi,id]
		);
		res.json("update success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Xoa ho khau 
app.delete("/hokhaus/:id", async(req,res) => 
{
	try 
	{
		const {id} = req.params;
		const deleteresult = await client.query(
			"DELETE FROM hokhau WHERE maho = $1",
			[id]
		);
		res.json("delete success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Quan ly nop tien
//Tao nop tien
app.post("/noptiens", async(req,res) =>
{
	try 
	{
		const{cccd,makt,sotien,ngaythu} = req.body;
		const result = await client.query (
			"INSERT INTO noptien (cccd,makt,sotien,ngaythu) VALUES($1,$2,$3,$4) RETURNING *",
			[cccd,makt,sotien,ngaythu]
		)
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//hien toan bo nop tien
app.get("/noptiens",async(req,res) =>
{
	try 
	{
		const {cccd,makt,sotien,ngaythu} = req.body;
		const allresult = await client.query(
			"SELECT * FROM noptien"
		);
		res.json(allresult.rows);
	}
	catch(err)
	{
		console.error(err.massage);
	}
}
)

//search nop tien
app.get("/noptiens/:cccd/:makt", async(req,res) => {
	try
	{
		const {cccd} = req.params;
		const {makt} = req.params;
		const result = await client.query("SELECT * FROM noptien WHERE cccd = $1 AND makt = $2",
		[cccd,makt]);
		res.json(result.rows);
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//cap nhap nop tien
app.put("/noptiens/:cccd/:makt", async(req,res) =>
{
	try 
	{
		const{cccd} = req.params;
		const{makt} = req.params;
		const{sotien,ngaythu} = req.body;
		const result = await client.query(
			"UPDATE noptien SET sotien= $1, ngaythu = $2 WHERE cccd = $3 AND makt = $4 RETURNING *",
			[sotien,ngaythu,cccd,makt]
		);
		res.json("update success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)

//Xoa nop tien 
app.delete("/noptiens/:cccd/:makt", async(req,res) => 
{
	try 
	{
		const {cccd} = req.params;
		const {makt} = req.params;
		const deleteresult = await client.query(
			"DELETE FROM noptien WHERE cccd = $1 AND makt = $2",
			[cccd,makt]
		);
		res.json("delete success");
	}
	catch(err)
	{
		console.error(err.message);
	}
}
)


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