import db from "../db.js"

export const thongkeGioiTinh = (req,res)=>{
    const {nam} = req.body;
    db.query(
        'SELECT * FROM nhankhau WHERE EXTRACT(YEAR FROM ngaysinh)<=$1 AND nhankhau.id NOT IN (SELECT idnguoichet FROM khaitu WHERE EXTRACT(YEAR FROM ngaychet)<$1) AND nhankhau.id NOT IN (SELECT idnguoitamvang FROM tamvang WHERE EXTRACT(YEAR FROM ngaybatdau)<$1 AND EXTRACT(YEAR FROM ngayketthuc )>$1) ',
        [nam],
        (error,results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                var nam = 0;
                var nu = 0;
                var khac = 0;
                const data = results.rows;
                for(let element of data){
                    if(element.gioitinh==="Nam")nam++;
                    else if(element.gioitinh==="Nữ")nu++;
                    else khac++;
                }//  {id:0,value:mamnon,label:'Mầm non'},
                let r = [{id:0,value:nam,label:'Nam'},
                {id:1,value:nu,label:'Nữ'},
                {id:2,value:khac,label:'Khác'},
                 ]
                res.json(r)
            }
        }
    )

}
export const thongkeTuoi = (req,res) => {
    const {nam} = req.body;
    const TUOILAODONG = 65;
    db.query(
        'SELECT nhankhau.*,($1-EXTRACT(YEAR FROM ngaysinh)) as tuoi FROM nhankhau WHERE nhankhau.id NOT IN (SELECT idnguoichet FROM khaitu WHERE EXTRACT(YEAR FROM ngaychet)<$1) AND nhankhau.id NOT IN (SELECT idnguoitamvang FROM tamvang WHERE EXTRACT(YEAR FROM ngaybatdau)<$1 AND EXTRACT(YEAR FROM ngayketthuc )>$1) ',
        [Number(nam)],
        (error, results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                var data = results.rows
                var mamnon = 0;//<6
                var cap1 = 0;//<11
                var cap2 = 0;//<15
                var cap3 =0;//<18
                var tuoilaodong = 0;//<<TUOILAODONG
                var tuoinghihuu  = 0;//CONLAI
                for(let element of data){
                    if(Number(element.tuoi)<6){
                        mamnon++;
                    }else if((Number(element.tuoi)<11)){
                        cap1++;
                    }
                    else if(Number(element.tuoi)<15){
                        cap2++;
                    }else if(Number(element.tuoi)<18){
                        cap3++;
                    }else if(Number(element.tuoi)<TUOILAODONG){
                        tuoilaodong++;
                    }
                    else tuoinghihuu++;
                }
                res.json([
                    {id:0,value:mamnon,label:'Mầm non'},
                    {id:1,value:cap1,label:'Cấp 1'},
                    {id:2,value:cap2,label:'Cấp 2'},
                {id:3,value:cap3,label:'Cấp 3'},
            {id:4,value:tuoilaodong,label:'Tuổi lao động'},
        {id:5,value:tuoinghihuu,label:'Tuổi nghỉ hưu'}])
            }
        }
    )
}
export const tamvang = (req,res) => {
    const {nam}= req.body
    db.query(
        'SELECT COUNT(*) FROM tamvang where EXTRACT(YEAR FROM ngaybatdau)<=$1 AND EXTRACT(YEAR FROM ngayketthuc)>=$1',
        [nam],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server -")
            } else {
                const soluong = results.rows[0].count
                res.json({soluong})
            }
        }
    )
}
export const tamtru = (req,res) => {
    const {nam}= req.body
    db.query(
        'SELECT COUNT(*) FROM tamtru where EXTRACT(YEAR FROM ngaybatdau)<=$1 AND EXTRACT(YEAR FROM ngayketthuc)>=$1',
        [nam],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server -")
            } else {
                const soluong = results.rows[0].count
                res.json({soluong})
            }
        }
    )
}