import { PieChart } from "@mui/x-charts"
import axios from 'axios';
import { useEffect, useState } from "react";

const Tuoi = ({nam})=>{
    const [data,setdata]= useState([
      {id:0,value:1,label:'Mầm non'},
      {id:1,value:2,label:'Cấp 1'},
      {id:2,value:3,label:'Cấp 2'},
      {id:3,value:4,label:'Cấp 3'},
      {id:4,value:5,label:'Tuổi lao động'},
      {id:5,value:6,label:'Tuổi nghỉ hưu'}
    ])
        
    useEffect(()=>{
      const fetch = async ()=>{
          let response = await axios.post('http://localhost:4000/api/thongke/tuoi',{nam})
          console.log(response.data)
          setdata(response.data);
      };
      fetch();
    },[])

    return ( <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <PieChart
    series={[
      {
        data,
      },
    ]}
    width={600}
    height={300}
  /><div style={{marginTop:'10px', marginLeft: '50%'}}>Thống kê theo tuổi</div>
    </div>)
}

export default Tuoi;