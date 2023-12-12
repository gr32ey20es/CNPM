import { useContext } from "react";
import { KhoanThuContext } from "../KhoanThuContext";
import service from "../service";
function themKhoanThu(e,listKhoanThu,setListKhoanThu,setTrigger,tenkhoanthu,loai,sotien,setMessage){
    e.preventDefault();
    if(tenkhoanthu.length===0){
        setMessage('Nhập tên khoản thu');
        return;
    }
    if(sotien.length===0&&loai === 'Bắt buộc'){
        setMessage('Nhập số tiền');
        return;
    }
    if(sotien<0){
        setMessage('Số tiền phải lớn hơn hoặc bằng 0');
        return
    }
    for(let khoanthu of listKhoanThu){
        if(khoanthu.tenkhoanthu.toLowerCase() === tenkhoanthu.toLowerCase()){
            setMessage('Tên khoản thu đã tồn tại')
            return;
        }
    }
    var makhoanthu 
    if(listKhoanThu.length ===0) {
         makhoanthu = 'KT001';
    }
    else {
        const temp = listKhoanThu[listKhoanThu.length-1].makhoanthu.toString();
        const number = Number(temp.substring(2,5));
    
          makhoanthu = 'KT' +(1001+number).toString().substring(1,4);
    }
    
    let khoanthu = {
        makhoanthu,
        tenkhoanthu,
        loai,
        sotien
    }
    setListKhoanThu(prev=>[...prev,khoanthu])
    service.addKhoanThu(khoanthu)
    setTrigger(false);

}
async function  onChangeLoai(e,setLoai,setSoTien,setDisable){
    const loai = e.target.value;
    setLoai(loai);
    if(loai === 'Tự nguyện'){
        await setSoTien(0);
        await setDisable(true);
    }else{
        await setSoTien('');
        await setDisable(false);

    }
}
export default  {themKhoanThu,onChangeLoai}