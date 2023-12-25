import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
import { TamTru, Dashboard, NhanKhau, KhoanThu, NopTien, Login, Account }  
  from './pages';

import Navbar from './component/navbar/Navbar'

import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/account" exact element={<Account />} />
        <Route path="/khoanthu" exact element={<KhoanThu />} />
        <Route path="/noptien"  exact element={<NopTien />}  />
        <Route path="/hokhau" exact element={<NhanKhau />} />
        <Route path="/tamtru" exact element={<TamTru />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </Router>
    
  );
}

export default App;