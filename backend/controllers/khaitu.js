import db from "../db.js"

export const getKhaiTu = (req,res) => {
    db.query(
        'SELECT * FROM khaitu WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server - getKhaiTu")
            } else {
                const khaitu = results.rows
                res.json(khaitu)
            }
        }
    )
}


export const updateKhaiTuById = (req,res) => {
    const {sogiaykhaitu,idnguoikhai,idnguoichet,ngaychet,nguyennhan} = req.body
    const putId = req.params.id
    console.log(putId)
    const query = 
        'UPDATE "khaitu" SET "sogiaykhaitu"=$1,"idnguoikhai"=$2,"idnguoichet"=$3,"ngaychet"=$4,"nguyennhan"=$5 WHERE "id"=$6 '
    db.query(
        query,
        [
            sogiaykhaitu,
            parseInt(idnguoikhai),
            parseInt(idnguoichet),
            new Date(ngaychet),
            nguyennhan,
            parseInt(putId)
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - updateKhaiTuById")
            } else {
                res.json("Cập nhật thông tin khai tử thành công")
            }
        }
    )
}

export const addKhaiTu = (req,res) => {
    const {id,idnguoikhai,idnguoichet,ngaychet,nguyennhan} = req.body
    db.query(
        'INSERT INTO khaitu ("idnguoikhai","idnguoichet","ngaychet","nguyennhan") VALUES ($1,$2,$3,$4)',
        [
            parseInt(idnguoikhai),
            parseInt(idnguoichet),
            new Date(ngaychet),
            nguyennhan
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - addKhaiTu")
            } else {
                res.json("Thành công")
            }
        }
    )
}

export const deleteKhaiTu = (req,res) => {
    db.query(
        'DELETE FROM khaitu WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - deleteKhaiTu")
            } else {
                res.json("Xóa thông tin khai tử thành công")
            }
        }
    )
}