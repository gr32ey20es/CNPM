import db from "../db.js"

export const getNhanKhau = (req,res) => {
    db.query(
        'SELECT * FROM nhankhau WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server - getNhanKhau")
            } else {
                const nhankhau = results.rows
                res.json(nhankhau)
            }
        }
    )
}


export const _update = (req,res) => {
    const {id,hoten,bietdanh,ngaysinh,gioitinh,noisinh,nguyenquan,diachi,dantoc,tongiao,quoctich,hochieu,nghenghiep,noilamviec,cccd,ngaycap,noicap,ngaychuyenden,noithuongtrutruoc,quanhe,mahokhau} = req.body

    const query = 
        'UPDATE "nhankhau" SET "hoten"=$1,"bietdanh"=$2,"ngaysinh"=$3,"gioitinh"=$4,"noisinh"=$5,"nguyenquan"=$6,"diachi"=$7,"dantoc"=$8,"tongiao"=$9,"quoctich"=$10,"hochieu"=$11,"nghenghiep"=$12,"noilamviec"=$13,"cccd"=$14,"ngaycap"=$15,"noicap"=$16,"ngaychuyenden"=$17,"noithuongtrutruoc"=$18,"quanhe"=$19,"mahokhau"=$20 WHERE "id"=$21'
    db.query(
        query,
        [
            hoten,
            bietdanh,
            ngaysinh,
            gioitinh,
            noisinh,
            nguyenquan,
            diachi,
            dantoc,
            tongiao,
            quoctich,
            hochieu,
            nghenghiep,
            noilamviec,
            cccd,
            ngaycap,
            noicap,
            ngaychuyenden,
            noithuongtrutruoc,
            quanhe,
            parseInt(mahokhau),
            parseInt(id)
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - updateNhanKhauById")
            } else {
                res.json("Cập nhật nhân khẩu thành công")
            }
        }
    )
}

export const addNhanKhau = (req,res) => {
    var {hoten,bietdanh,ngaysinh,gioitinh,noisinh,nguyenquan,diachi,dantoc,tongiao,quoctich,hochieu,nghenghiep,noilamviec,cccd,ngaycap,noicap,ngaychuyenden,noithuongtrutruoc,quanhe,mahokhau} = req.body
    if(ngaycap==='')ngaycap = null;
    if(ngaychuyenden==='')ngaychuyenden = null;
    db.query(
        'INSERT INTO nhankhau ("hoten","bietdanh","ngaysinh","gioitinh","noisinh","nguyenquan","diachi","dantoc","tongiao","quoctich","hochieu","nghenghiep","noilamviec","cccd","ngaycap","noicap","ngaychuyenden","noithuongtrutruoc","quanhe","mahokhau") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
        [
            hoten,
            bietdanh,
            ngaysinh,
            gioitinh,
            noisinh,
            nguyenquan,
            diachi,
            dantoc,
            tongiao,
            quoctich,
            hochieu,
            nghenghiep,
            noilamviec,
            cccd,
            ngaycap,
            noicap,
            ngaychuyenden,
            noithuongtrutruoc,
            quanhe,
            parseInt(mahokhau)
        ],
        (error,results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json({status:"Thành công",nhankhau:results.rows[0]})
            }
        }
    )
}


export const deleteNhanKhau = (req,res) => {
    db.query(
        'DELETE FROM nhankhau WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json("Xóa nhân khẩu thành công")
            }
        }
    )
}
export const getdetail = (req,res) => {
    const {id} = req.body;
    let data = {};
    let tamvang = '';
    let khaitu = '';
    db.query(
        'SELECT * FROM nhankhau WHERE id = $1',
        [parseInt(id)],
        (error,results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                data = results.rows[0];
                
                db.query(
                    'SELECT * FROM tamvang WHERE idnguoitamvang = $1 AND ngayketthuc > now()',
                    [id],
                    (error,results)=>{
                        if(error) {
                            res.status(500).send(error.message)
                        } else{
                            if(results.rows.length===0)tamvang = '';
                            else {
                                let temp = results.rows[0];
                                console.log(temp);
                                let ngaybatdau = (new Date(temp.ngaybatdau));
                                let ngayketthuc = (new Date(temp.ngayketthuc));
                                console.log({ngaybatdau,ngayketthuc})
                                let temp1 = `${ngaybatdau.getDate()}/${ngaybatdau.getMonth()}/${ngaybatdau.getFullYear()}`
                               let  temp2 = `${ngayketthuc.getDate()}/${ngayketthuc.getMonth()}/${ngayketthuc.getFullYear()}`
                                
                                    tamvang+=`${data.hoten} tạm vắng từ ngày ${temp1} đến ngày ${temp2} do ${temp.nguyennhan}`
                                
                                
                                
                            }
                            console.log(tamvang);
                            db.query(
                                'SELECT * FROM khaitu WHERE idnguoichet = $1 ',
                                [id],
                                (error,results)=>{
                                    if(error) {
                                        res.status(500).send(error.message)
                                    } else{
                                        if(results.rows.length===0)khaitu = '';
                                        else {
                                            let temp = results.rows[0];
                                            console.log(temp);
                                            let ngaychet = (new Date(temp.ngaychet));
                                            let temp1 = `${ngaychet.getDate()}/${ngaychet.getMonth()}/${ngaychet.getFullYear()}`
                                          khaitu+=`${data["hoten"]} mất ngày ${temp1}  do ${temp.nguyennhan}`
                                            
                                            
                                            
                                        }
                                        console.log(khaitu );
                                        res.json({data,khaitu,tamvang})
                                    }
                                    
                                }
                            )
                        }
                    }
                )
            }
        }
    )
}
