import db from "../db.js"

export const getTamVang = (req,res) => {
    db.query(
        'SELECT * FROM tamvang WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server - getTamVang")
            } else {
                const tamvang = results.rows
                res.json(tamvang)
            }
        }
    )
}


export const updateTamVangById = (req,res) => {
    const {idnguoitamvang,ngaybatdau,nguyennhan} = req.body
    const putId = req.params.id
    console.log(putId)
    const query = 
        'UPDATE "tamvang" SET "idnguoitamvang"=$1,"ngaybatdau"=$2,"nguyennhan"=$3 WHERE "id"=$4 '
    db.query(
        query,
        [
            parseInt(idnguoitamvang),
            new Date(ngaybatdau),
            nguyennhan,
            parseInt(putId)
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - updateTamVangById")
            } else {
                res.json("Cập nhật thông tin tạm vắng thành công")
            }
        }
    )
}

export const addTamVang = (req,res) => {
    const {idnguoitamvang,ngaybatdau,nguyennhan,ngayketthuc} = req.body
    db.query(
        'INSERT INTO tamvang ("idnguoitamvang","ngaybatdau","nguyennhan","ngayketthuc") VALUES ($1,$2,$3,$4)',
        [ parseInt(idnguoitamvang),
            new Date(ngaybatdau),
            nguyennhan,
            ngayketthuc
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - addTamVang")
            } else {
                res.json("Thành công")
            }
        }
    )
}

export const deleteTamVang = (req,res) => {
    db.query(
        'DELETE FROM tamvang WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - deleteTamVang")
            } else {
                res.json("Xóa thông tin tạm vắng thành công")
            }
        }
    )
}