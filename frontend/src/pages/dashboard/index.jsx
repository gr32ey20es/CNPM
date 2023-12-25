import Tuoi from './Tuoi'
import GioiTinh from './gioitinh';

function Dashboard() { 
    return <div style = {{position:'absolute',top:'200px',left:'0px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Tuoi nam="2023"/>
        <GioiTinh nam = "2023"/>
    </div>
}

export default Dashboard;