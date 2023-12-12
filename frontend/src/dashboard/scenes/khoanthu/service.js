import axios from "axios";
const service = axios.create({
    baseURL:"http://localhost:4000/khoanthu"
})
function getData(setListKhoanThu){
    // service.get('/')
    // setListKhoanThu()
}
function addKhoanThu(khoanthu){

    // let khoanthu = {
    //     makhoanthu,
    //     tenkhoanthu,
    //     loai,
    //     sotien
    // }
    //service.post('/add',khoanthu);
    console.log(khoanthu);
}
function deleteItem(makhoanthu){
    // service.delete('/delete',{makhoanthu});
    console.log(makhoanthu);

}

function updateKhoanThu(makhoanthu,tenkhoanthu,loai,sotien){
    // service.put('/update',{makhoanthu,tenkhoanthu,loai,sotien})
    let khoanthu = {
        makhoanthu,
        tenkhoanthu,
        loai,
        sotien
    }
    console.log(khoanthu);
}
export default {
    addKhoanThu,deleteItem,updateKhoanThu
}