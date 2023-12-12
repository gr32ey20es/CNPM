import { useContext, useState } from 'react'
import '../css/AddKhoanThu.css'
import closeIcon from '../images/closeIcon.png'
import AddKhoanThuController from '../controller/AddKhoanThuController'
import { KhoanThuContext } from '../KhoanThuContext'

function AddKhoanThu({setTrigger}){
    const [tenkhoanthu,settenkhoanthu] = useState('')
    const [loai,setloai]  = useState('Bắt buộc')
    const [sotien,setsotien] =  useState('');
    const [message,setmessage] = useState('');
    const [disableInputSotien,setDisableInputSoTien] = useState(false);
    const {listKhoanThu,setListKhoanThu} = useContext(KhoanThuContext);
    return(
        <div className="formBackground">
            <div className='formContainer'>
              <button id = "closeButton" onClick = {(e)=>setTrigger(false)}><img src={closeIcon}/></button>
              <h1>Thêm khoản thu</h1>
              <form className="form" onSubmit={(e)=>AddKhoanThuController.themKhoanThu(e,listKhoanThu,setListKhoanThu,setTrigger,tenkhoanthu,loai,sotien,setmessage)}>
                <label htmlFor = "tenkhoanthu">Tên khoản thu</label>
                <input className = "input" type = "text" id = "tenkhoanthu" placeholder="Tên khoản thu" value = {tenkhoanthu} onChange={(e)=>settenkhoanthu(e.target.value)}/>
                <label htmlFor = "loai">Loại</label>
                <select className = "select" id = "loai" value = {loai} onChange={(e)=>{AddKhoanThuController.onChangeLoai(e,setloai,setsotien,setDisableInputSoTien)}}>
                    <option  value = "Bắt buộc">Bắt buộc</option>
                    <option  value = "Tự nguyện">Tự nguyện</option>
                </select>
                <label htmlFor = "sotien">Số tiền</label>
                <input className = "input" type = "number" id = "sotien" placeholder = "Số Tiền" value = {sotien} disabled = {disableInputSotien}onChange={(e)=>setsotien(e.target.value)}/>
                {(message.length!==0)?<p id = "message">{message}</p>:''}
                <input className = "submit" type = "submit" value = "Thêm"/>
              </form>
              
            </div>
        </div>
    )
}
export default AddKhoanThu;