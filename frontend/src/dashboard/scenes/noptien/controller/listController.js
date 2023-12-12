import service from "../service";
function deleteItem(setListNopTien,mahokhau,makhoanthu){
    service.deleteItem(mahokhau,makhoanthu);
    setListNopTien(prev=>prev.filter((element)=>element.mahokhau!==mahokhau&&element.makhoanthu!==makhoanthu));
   
}
function deleteItems(setListNopTien,table){
    const rows = table.getSelectedRowModel().flatRows
    for(let row of rows){
        deleteItem(setListNopTien,row.original.mahokhau,row.original.makhoanthu)
        //:row
    }
    
    table.toggleAllRowsSelected(false);
}
async function updateItem(setTrigger,setKhoannop,khoannop){

    //setTemp item and show update dialog
    await setKhoannop(khoannop)
    await setTrigger(true)

}

export {deleteItem,updateItem,deleteItems}