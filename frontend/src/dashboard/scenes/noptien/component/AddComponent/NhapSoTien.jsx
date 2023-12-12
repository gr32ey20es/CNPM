import { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import './nhapsotien.css'
export function NhapSoTien({data,setdata}){
  
    return (
        <div className="nhapsotien-container" >
            <h1>Thông tin khoản nộp</h1>
            <label htmlFor="nhapsotien">Số tiền</label>
            <input className = "input" value = {data.sotien} disabled = {data.loai ==='Bắt buộc'} onChange={(e)=>setdata(prev=>{return {...prev,sotien:e.target.value}})} id = "nhapsotien" type = "number" placeholder="Nhập số tiền"/>
            <label htmlFor="ngaynop">Ngày nộp</label>
            <ReactDatePicker className="input" selected = {data.ngaynop} maxDate={new Date()} dateFormat = "dd/MM/yyyy" onChange={(date)=>setdata(prev=>{return {...prev,ngaynop:date}})}/>

        </div>
    )
}