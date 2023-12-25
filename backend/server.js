import express from "express";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

//
import khoanthuRoutes from './routes/khoanthu.js';
app.use("/api/khoanthu", khoanthuRoutes);
// 
import noptienRoutes from './routes/noptien.js';
app.use("/api/noptien", noptienRoutes)
//
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);
//
import userRoutes from "./routes/users.js";
app.use("/api/users", userRoutes);
//

import nhankhauRoutes from "./routes/nhankhau.js"
import hokhauRoutes from "./routes/hokhau.js"
import khaituRoutes from './routes/khaitu.js'
import tamvangRoutes from './routes/tamvang.js'
import tamtruRoutes from './routes/tamtru.js'
import thongkeRoutes from './routes/thongke.js'

app.use("/api/nhankhau",nhankhauRoutes)
app.use("/api/hokhau",hokhauRoutes)
app.use("/api/khaitu", khaituRoutes)
app.use('/api/tamvang',tamvangRoutes)
app.use("/api/tamtru",tamtruRoutes)
app.use('/api/thongke', thongkeRoutes)

app.get('*', (req, res) => res.send('404 NOT FOUND!!!'))

app.listen(4000, () => {
  console.log("Connected!");
});


