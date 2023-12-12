import service from "../service";
function UpdateKhoanThu(e,setListKhoanThu,setmessage,setTrigger,makhoanthu,tenkhoanthu,loai,sotien){
    e.preventDefault();
    if(tenkhoanthu.length===0){
        setmessage('Nhập tên khoản thu');
        return;
    }
    if(sotien.length===0&&loai === 'Bắt buộc'){
        setmessage('Nhập số tiền');
        return;
    }
    if(sotien<0){
        setmessage('Số tiền phải lớn hơn hoặc bằng 0');
        return
    }
    
    setListKhoanThu(prev=>prev.map((element)=>{
        if(element.makhoanthu === makhoanthu)return {...element,tenkhoanthu,loai,sotien}
        else return element;
    }))
    service.updateKhoanThu(makhoanthu,tenkhoanthu,loai,sotien);
    setTrigger(false)
    
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
export default {
    UpdateKhoanThu,
    onChangeLoai
}