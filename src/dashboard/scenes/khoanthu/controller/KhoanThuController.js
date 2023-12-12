import service from "../service";
function deleteItem(setListKhoanThu,makhoanthu){
    setListKhoanThu(prev=>prev.filter((element) =>element.makhoanthu!==makhoanthu));
    service.deleteItem(makhoanthu);
}
async function updateItem(showPopup,setChoiced,data){
    await setChoiced(data);
    await showPopup(true);
}
function deleteItems(setListKhoanThu,table){
    for(let row of table.getSelectedRowModel().flatRows){
        deleteItem(setListKhoanThu,row.original.makhoanthu);
    }
    table.toggleAllRowsSelected(false);
}
export default {
    deleteItem,updateItem,deleteItems
}