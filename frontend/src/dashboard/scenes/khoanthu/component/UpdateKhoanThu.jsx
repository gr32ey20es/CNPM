import { useContext, useState } from 'react'
import '../css/AddKhoanThu.css'
import closeIcon from '../images/closeIcon.png'
import UpdateKhoanThuController from '../controller/UpdateKhoanThuController'
import { KhoanThuContext } from '../KhoanThuContext'
import reactDom from 'react-dom'
function UpdateKhoanThu({data,setTrigger}){
    const [tenkhoanthu,settenkhoanthu] = useState(data.tenkhoanthu)
    const [loai,setloai]  = useState(data.loai)
    const [sotien,setsotien] =  useState(data.sotien);

    const [message,setmessage] = useState('');
    const [disableInputSotien,setDisableInputSoTien] = useState(false);
    const {listKhoanThu,setListKhoanThu} = useContext(KhoanThuContext);
    return (
      <div className="formBackground">
      <div className='formContainer' >
        <button id = "closeButton" onClick = {(e)=>setTrigger(false)}><img src={closeIcon}/></button>
        <h1>Sửa khoản thu</h1>
        <form className="form" onSubmit={(e)=>UpdateKhoanThuController.UpdateKhoanThu(e,setListKhoanThu,setmessage,setTrigger,data.makhoanthu,tenkhoanthu,loai,sotien)}>
        <label htmlFor = "makhoanthu">Mã khoản thu</label>
          <input className = "input" id = "makhoanthu" type = "text" value = {data.makhoanthu} disabled = {true}/>
          <label htmlFor = "tenkhoanthu">Tên khoản thu</label>
          <input className = "input" type = "text" id = "tenkhoanthu" placeholder="Tên khoản thu" value = {tenkhoanthu} onChange={(e)=>settenkhoanthu(e.target.value)} onFocus={(e)=>setmessage('')}/>
          <label htmlFor = "loai">Loại</label>
          <select className = "select" id = "loai" value = {loai} onChange={(e)=>{UpdateKhoanThuController.onChangeLoai(e,setloai,setsotien,setDisableInputSoTien)}}>
              <option  value = "Bắt buộc">Bắt buộc</option>
              <option  value = "Tự nguyện">Tự nguyện</option>
          </select>
          <label htmlFor = "sotien">Số tiền</label>
          <input className = "input" type = "number" id = "sotien" placeholder = "Số Tiền" value = {sotien} onFocus={(e)=>setmessage('')}disabled = {disableInputSotien}onChange={(e)=>setsotien(e.target.value)}/>
          {(message.length!==0)?<p id = "message">{message}</p>:''}
          <input className = "submit" type = "submit" value = "Thêm" />
        </form>
        
      </div>
  </div>
   );
}
export default UpdateKhoanThu;