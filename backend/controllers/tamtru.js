import db from "../db.js"

export const _get = (req,res) => {
    db.query(
        'SELECT * FROM tamtru WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error, results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                const tamtru = results.rows
                res.json(tamtru)
            }
        }
    )
}
export const _delete = (req,res) => {
    db.query(
        'DELETE FROM tamtru WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json("Thành công")
            }
        }
    )
}
export const _add = (req,res) =>{
    const {hoten,ngaysinh,gioitinh,cccd,quequan,diachi,ngaybatdau,ngayketthuc} = req.body;
    
    db.query(
        'INSERT INTO "public"."tamtru" ("hoten", "ngaysinh", "gioitinh", "cccd", "quequan", "diachi","ngaybatdau","ngayketthuc")VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
        ,[hoten,ngaysinh,gioitinh,cccd,quequan,diachi,ngaybatdau,ngayketthuc],
        (error,results)=>{
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json("Thành công")
            }
        }
    )
}
export const _put = (req,res) =>{
    const {id,hoten,ngaysinh,gioitinh,cccd,quequan,diachi,ngaybatdau,ngayketthuc} = req.body;
    db.query(
        'UPDATE "tamtru" SET "hoten" = $1, "ngaysinh" = $2, "gioitinh"=$3, "cccd"=$4, "quequan"=$5, "diachi"=$6,"ngaybatdau" = $7,"ngayketthuc"=$8 WHERE id = $9'
        ,[hoten,ngaysinh,gioitinh,cccd,quequan,diachi,ngaybatdau,ngayketthuc,id],
        (error,results)=>{
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json("Thành công")
            }
        }
    )
}



