import { useState } from "react"
import './choice.css';
const fakelist = [
    { makhoanthu: 'KT001', tenkhoanthu: 'Nước', loai: 'Bắt buộc', sotien: '7000' },
    { makhoanthu: 'KT002', tenkhoanthu: 'Điện', loai: 'Bắt buộc', sotien: '8000' },
    { makhoanthu: 'KT003', tenkhoanthu: 'Internet', loai: 'Bắt buộc', sotien: '6000' },
    { makhoanthu: 'KT004', tenkhoanthu: 'Gửi xe', loai: 'Bắt buộc', sotien: '5000' },
    { makhoanthu: 'KT005', tenkhoanthu: 'Tiền nhà', loai: 'Bắt buộc', sotien: '10000' },
    { makhoanthu: 'KT006', tenkhoanthu: 'Tiền điện thoại', loai: 'Bắt buộc', sotien: '7000' },
    { makhoanthu: 'KT007', tenkhoanthu: 'Quỹ phòng cháy', loai: 'Bắt buộc', sotien: '2000' },
    { makhoanthu: 'KT008', tenkhoanthu: 'Quỹ sửa chữa', loai: 'Bắt buộc', sotien: '3000' },
    { makhoanthu: 'KT009', tenkhoanthu: 'Quỹ khẩn cấp', loai: 'Bắt buộc', sotien: '4000' },
    { makhoanthu: 'KT010', tenkhoanthu: 'Quỹ tự nguyện', loai: 'Tự nguyện', sotien: '0' }
  ]
  ;
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
  
export default function ChonKhoanThu({title,data,setdata}){
  const[token,settoken] = useState('');
    const [listKhoanThu,setListKhoanThu] = useState(fakelist);
    const clickhandler = (element)=>{
      
      setdata(prev=>{return {...prev,makhoanthu:element.makhoanthu,loai:element.loai,dongia:element.sotien,tenkhoanthu:element.tenkhoanthu}})}
      
    return (
        <div className="choice-box">
            <h1>{title}</h1>
            <input type = "text" placeholder = "Tìm kiếm khoản thu" onChange={(e)=>settoken(removeVietnameseChars(e.target.value.toLocaleLowerCase()))}/>
            <div className="listcontainer">
                 {listKhoanThu.filter((element)=>{
                  return removeVietnameseChars(element.tenkhoanthu.toLocaleLowerCase()).includes(token)||
                  removeVietnameseChars(element.loai.toLocaleLowerCase()).includes(token)||
                  removeVietnameseChars(element.sotien.toLocaleLowerCase()).includes(token)
                 }).map((element)=>
                  <div 
                  className={`choice-row ${element.makhoanthu === data.makhoanthu?'selected':'notselect'}`}
                  onClick={(e)=>clickhandler(element)}>
                  {`${element.tenkhoanthu} (${element.loai})  ${element.loai==='Bắt buộc'?`- ${element.sotien}/nhân khẩu/tháng`:''} `}
                
                </div>)}
            </div>
           
           
            
        </div>
       
    )
}