import { useState,useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts"
const  GioiTinh = ({nam})=>{
    const [data,setdata]= useState([{id:0,value:3,label:'Nam'},
    {id:1,value:1,label:'Nữ'},
    {id:2,value:2,label:'Khác'},
     ])
    useEffect(()=>{
        const fetch = async ()=>{
            let response = await axios.post('http://localhost:4000/api/thongke/gioitinh',{nam})
            console.log(response.data)
            setdata(response.data);
        };fetch();
    },[])
    return (
      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
        <PieChart
    series={[
      {
        data,
      },
    ]}
    width={600}
    height={300}
  />
  <div style={{marginTop:'10px', marginLeft: '50%'}}>Thống kê theo giới tính</div>
      </div>
    )
}
export default GioiTinh