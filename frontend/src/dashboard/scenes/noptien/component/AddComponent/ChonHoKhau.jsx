import { useState } from "react"
import './choice.css';
const fakelist = [
    {
      mahokhau: 'HK001',
      chuho: 'Đào Văn Nguyên Huy',
      bietdanh: 'Ông Huy',
      diachi: 'Số 1 Đại Cồ Việt',
      thanhvien: '4'
    },
    {
      mahokhau: 'HK002',
      chuho: 'Nguyễn Thị Hồng',
      bietdanh: 'Bà Hồng',
      diachi: 'Số 2 Lê Lợi',
      thanhvien: '3'
    },
    {
      mahokhau: 'HK003',
      chuho: 'Trần Văn An',
      bietdanh: 'An',
      diachi: 'Số 3 Hàm Nghi',
      thanhvien: '5'
    },
    {
      mahokhau: 'HK004',
      chuho: 'Lê Thị Mai',
      bietdanh: 'Mai',
      diachi: 'Số 4 Nguyễn Huệ',
      thanhvien: '2'
    },
    {
      mahokhau: 'HK005',
      chuho: 'Phạm Văn Đạt',
      bietdanh: 'Đạt',
      diachi: 'Số 5 Quang Trung',
      thanhvien: '6'
    },
    {
      mahokhau: 'HK006',
      chuho: 'Trần Thị Hương',
      bietdanh: 'Hương',
      diachi: 'Số 6 Trần Hưng Đạo',
      thanhvien: '4'
    },
    {
      mahokhau: 'HK007',
      chuho: 'Nguyễn Văn Linh',
      bietdanh: 'Linh',
      diachi: 'Số 7 Lý Thường Kiệt',
      thanhvien: '3'
    },
    {
      mahokhau: 'HK008',
      chuho: 'Vũ Thị Ngọc',
      bietdanh: 'Ngọc',
      diachi: 'Số 8 Phan Bội Châu',
      thanhvien: '5'
    },
    {
      mahokhau: 'HK009',
      chuho: 'Hoàng Văn Nam',
      bietdanh: 'Nam',
      diachi: 'Số 9 Nguyễn Bỉnh Khiêm',
      thanhvien: '2'
    },
    {
      mahokhau: 'HK010',
      chuho: 'Nguyễn Thị Lan',
      bietdanh: 'Lan',
      diachi: 'Số 10 Điện Biên Phủ',
      thanhvien: '7'
    }
  ];

  const removeVietnameseChars = (str) => {
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  };
export default function ChonHoKhau({title,data,setdata}){
    const[token,settoken] = useState('');
    const [listHoKhau,setListHoKhau] = useState(fakelist);
    const clickhandler = async (element)=>{
    
      setdata(prev=>{return {...prev,mahokhau:element.mahokhau,thanhvien:element.thanhvien,tenchuho:element.chuho,diachi:element.diachi,bietdanh:element.bietdanh,thanhvien:element.thanhvien}})}
    return (
        <div className="choice-box">
            <h1>{title}</h1>
            <input type = "text" placeholder = "Tìm kiếm hộ khẩu" onChange={(e)=>settoken(removeVietnameseChars(e.target.value.toLocaleLowerCase()))}/>
            <div className="listcontainer">
                 {listHoKhau.filter((element)=>{
                 return removeVietnameseChars(element.chuho.toLowerCase()).includes(token)||
                 removeVietnameseChars(element.diachi.toLowerCase()).includes(token)
                 }).map((element)=>
                  <div 
                  className={`choice-row ${element.mahokhau === data.mahokhau?'selected':'notselect'}`}
                  onClick={(e)=>clickhandler(element)}>
                  {`${element.chuho} (${element.bietdanh}) - ${element.diachi} `}
                  </div>
                  )}
            </div>
           
           
            
        </div>
       
    )
}