import React, { useContext, useState } from 'react'
import closeIcon from '../images/closeIcon.png'

import 'react-datepicker/dist/react-datepicker.module.css'
import '../css/update.css';
import { useMultipartForm } from './AddComponent/useMultipartForm';
import ChonHoKhau from './AddComponent/ChonHoKhau';
import ChonKhoanThu from './AddComponent/ChonKhoanThu';
import { NhapSoTien } from './AddComponent/NhapSoTien';
import { NopTienContext } from '../NopTienContext';

function Add({setTrigger}){
    //chủ hộ, khoản thu,số tiền,ngày thu
    const {setListNopTien} = useContext(NopTienContext)
    const [data,setdata] = useState({
        tenchuho:'',
        bietdanh:'',
        tenkhoanthu:'',
        diachi:'',
        mahokhau:'',
        thanhvien:'',
        makhoanthu:'',
        loai:'',
        dongia:0,
        sotien:0,
        ngaynop:new Date()
    })
    const[error,seterror] = useState('')
    const steplist = [
        <ChonHoKhau title = {"Chọn hộ khẩu"} data = {data} setdata={setdata} />,
        <ChonKhoanThu title = {"Chọn khoản thu"} data = {data} setdata={setdata} />,
        <NhapSoTien data = {data} setdata={setdata}/>
    ]
    const {currentStep,  step,  steps,  next,isfirst,isend,  back} = 
    useMultipartForm(steplist)
    const submit = (e,currentStep,seterror,setTrigger,next,data,setdata)=>{
        
        e.preventDefault()
        console.log(data)
        if(currentStep===0){
            if(data.mahokhau.length===0){
                seterror("Chọn hộ khẩu")
                return
            }
            seterror('')
            next()
            return
        }
        if(currentStep===1){
            if(data.makhoanthu.length === 0){
                seterror("Chọn khoản thu")
                return
            }
            //kiemtraxem khoan thu da ton tai chua
            if(data.loai==='Bắt buộc'){
                var temp = data.dongia * 12 * data.thanhvien
                setdata(prev=>{return {...prev,sotien:temp}})
                
            }
            else setdata(prev=>{return {...prev,sotien:''}})
            seterror('')
            next()
            return
        }
        if(currentStep ===2){
            if(data.sotien===''&&data.loai==='Tự nguyện'){
                seterror('Nhập số tiền')
                return
            }
            console.log(`ngay nop: ${data.ngaynop}`)
            if(data.ngaynop===null){
                seterror('Chọn ngày nộp')
                return
            }
            const year = data.ngaynop.getFullYear()
            const month = data.ngaynop.getMonth()+1
            const day = data.ngaynop.getDate()
            var temp = `${year}-${month}-${day}`
            let khoannop = {
                tenchuho:data.tenchuho,
                tenkhoanthu:data.tenkhoanthu,
                bietdanh:data.bietdanh,
                mahokhau: data.mahokhau,
                makhoanthu:data.makhoanthu,
                sotien:data.sotien.toString(),
                ngaynop:temp,
                diachi:data.diachi,
                thanhvien:data.thanhvien,
                loai:data.loai
            }
            setListNopTien(prev=>{
              return  [...prev,khoannop]})
            alert('Thành công')
            setTrigger(false);
           
        }
    

    }
    return(
        <div className="formBackground">
            <div className='formContainer' >
              <button id = "closeButton" onClick = {(e)=>setTrigger(false)}><img src={closeIcon}/></button>
              <div style = {{position:"absolute",top:"10px",right:"10px"}}>{currentStep+1}/{steps.length}</div>
              <form style={{display:"flex",flexDirection:"column"}} onSubmit={(e)=>submit(e,currentStep,seterror,setTrigger,next,data,setdata)}>
                {step}
                <div className='groupbutton'>
                   {!isfirst &&  (<button type = "button" onClick={(e)=>{seterror('');back()}}>Quay lại</button>)}
                   <button type = "submit">{isend?"Hoàn thành":"Tiếp tục"}</button>
                   {error.length===0?'':<p style = {{color:"red",position:"absolute",bottom:'10px',left:'20px'}}>{error}</p>}
                </div>
              </form>
            </div>
        </div>
    )
}
export default Add;