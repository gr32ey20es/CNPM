import { useContext, useState } from 'react'
import closeIcon from '../images/closeIcon.png'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'
import '../css/update.css';
import { submit } from '../controller/Update';
import { NopTienContext } from '../NopTienContext';
function Update({data,setTrigger}){
    //chủ hộ, khoản thu,số tiền,ngày thu
    const [sotien,setsotien] = useState(data.sotien);
    const [ngaynop,setngaynop] = useState(new Date(data.ngaynop));
    const chuho = data.tenchuho + '(' + data.bietdanh + ') '+ data.diachi;
    const {setListNopTien} = useContext(NopTienContext);
    const [error,seterror] = useState('');
    return(
        <div className="formBackground">
            <div className='formContainer'>
              <button id = "closeButton" onClick = {(e)=>setTrigger(false)}><img src={closeIcon}/></button>
              <h1>Sửa khoản nộp</h1>
              <form className="form" onSubmit={(e)=>submit(e,setListNopTien,setTrigger,seterror,data.loai,data.mahokhau,data.makhoanthu,sotien,ngaynop)} >
                <label htmlFor='chuho'>Chủ hộ</label>
                <input type = "text" id = "chuho" className='input' placeholder='Tên chủ hộ' disabled = {true} value = {chuho}/>
                <label  htmlFor='khoanthu'>Khoản thu</label>
                <input type = "text"  id = "khoanthu" className='input' placeholder='Khoản thu' disabled = {true} value = {data.tenkhoanthu}/>
                <label htmlFor='sotien'>Số tiền</label>
                <input type = "number"  id = "sotien" className='input' placeholder='Số tiền' value = {sotien} onChange={(e)=>setsotien(e.target.value)}
                disabled = {data.loai === 'Bắt buộc'}/>
                <label htmlFor='ngaynop'>Ngày nộp</label>
                <ReactDatePicker id = "ngaynop" className="input" style = {{width:"100%"}}selected={ngaynop} onChange={(date)=>setngaynop(date)} dateFormat={"dd/MM/yyyy"} isClearable maxDate={new Date()}
                placeholder = "Ngày thu:dd/mm/yyyy" />
                {error.length !== 0?<p style = {{color:'red',position:'absolute',left:"20px",bottom:"5px"}}>{error}</p>:''}
                <input className = "submit" type = "submit" value = "Cập nhật"/>
     
              </form>
              
            </div>
        </div>
    )
}
export default Update;