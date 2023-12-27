import Tuoi from './Tuoi'
import GioiTinh from './gioitinh';

function Dashboard() { 
    return <div style = {{display:'flex',justifyContent:'center',alignItems:'center', height: '80vh'}}>
        <Tuoi nam={(new Date()).getFullYear()}/>
        <div style={{paddingRight: '10px'}}></div>
        <GioiTinh nam = {(new Date()).getFullYear()}/>
    </div>
}

export default Dashboard;