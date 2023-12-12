import service from "../service";

function submit(e,setListNopTien,setTrigger,seterror,loai,mahokhau,makhoanthu,sotien,ngaynop){
    e.preventDefault();
    if(ngaynop===null){
        seterror('Nhập ngày nộp');
        return
    }
    if(loai === 'Tự nguyện' && Number(sotien) === 0) {
        seterror('Nhập số tiền!');
        return;
    }
    const temp =  `${ngaynop.getFullYear()}-${ngaynop.getMonth()+1}-${ngaynop.getDate()}`
    console.log(temp)
    setListNopTien(prev=>prev.map((element)=>{
        if(element.mahokhau === mahokhau && element.makhoanthu === makhoanthu){
            return {...element,sotien,ngaynop : temp};
        }else return element;
    }))
    service.updateItem(mahokhau,makhoanthu,sotien, temp)
    setTrigger(false);
}
export {submit};