import { AppContextProvider } from './AppContext/AppContext';
import './noptien.css';
import conectToServer from './Apis/conectToServer';
import { useContext, useEffect } from 'react';
import { AppContext } from './AppContext/AppContext';

function Row(props){
   return(
      <tr className='tableRow'>
      <td className="col1">
         {props.ten}
      </td>
      <td className="col2">
         {props.khoanThu}
      </td>
      <td className="col3">
         {props.ngay}
      </td>
      <td className="col4" >
      {props.loai}
      </td>
      <td className="col5" >
         <button id = "edit">Edit</button>
         <button id = "delete">Delete</button>
      </td>

      </tr>
   )
}
function NopTien (){
   
   const {listItem,setListItem} = useContext(AppContext);
   
   useEffect(()=>{
      const fetch = async ()=>{
        
         const response = await conectToServer.get('/');
         setListItem(response.data.list);
         console.log(response.data.list);
      }
      
      fetch();
   },[]);
   return( 
   <div id = "container">
      <div id = "headPage">
         <h1 id = "functionTitle">Nộp Tiền</h1>
         <form >
            <input type = "text" id = "searchBar" />
         </form>
         <button id = "searchButton">Search</button>
         <button id = "addButton">Add</button>
      </div>
      <table id = "tablePage">
         <tr>
            <th className="col1">TÊN</th>
            <th className="col2">KHOẢN THU</th>
            <th className="col3">NGÀY THU</th>
            <th className="col4"></th>
         </tr>
         {listItem.map((element)=>
            <Row ten = {element.ten} khoanThu = {element.tenkt} ngay = {(new Date(element.ngaynop)).toDateString()} loai = {element.loai}/>
         )}
      </table>

   </div>

  
  
   );
    
}
export default NopTien;
