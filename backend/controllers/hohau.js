import db from "../db.js"
export const _add = (req,res) => {
    var {hoten,bietdanh,ngaysinh,gioitinh,noisinh,nguyenquan,diachi,dantoc,tongiao,quoctich,hochieu,nghenghiep,noilamviec,cccd,ngaycap,noicap,ngaychuyenden,noithuongtrutruoc,quanhe} = req.body
    if(ngaycap==='')ngaycap = null;
    if(ngaychuyenden==='')ngaychuyenden = null;
    db.query(
        'SELECT nextVal(\'hokhau_id_seq\')',
        [],
        (error,results)=>{
            const mahokhau = results.rows[0].nextval;
            console.log("mahokhau "+mahokhau);
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
                    mahokhau
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
    )
}
export const _tach = (req, res) => {
    const {thanhvien,diachi} = req.body;//thanhvien la doi tuong chua nhankhauid va quanhe
    
  db.query(
    'SELECT nextVal(\'hokhau_id_seq\')',
    [],
    (error, results) => {
        if (error) {
            res.status(500).send(error.message);
            
          } else {
            const mahokhau = results.rows[0].nextval;
            const _sql = (id,quanhe,mahokhau,diachi) =>{
                return 'UPDATE nhankhau SET mahokhau =' + `${mahokhau},` + 'diachi = '+`\'${diachi}\',`+'quanhe = '+`\'${quanhe}\' WHERE id = `+`${id} returning *; `
            }
            var SQL = '';
            for(let nhankhau of thanhvien){
                SQL += _sql(nhankhau.id,nhankhau.quanhe,mahokhau,diachi);
            }
            db.query(
                SQL,
                [],
                (error, results) => {
                    if (error) {
                        res.status(500).send(error.message);
                        console.log(mahokhau);
                      } else {
                        res.json({status:"Thành công",mahokhau})
                        }
                 }

            )
          }
      
    }
  );
};
