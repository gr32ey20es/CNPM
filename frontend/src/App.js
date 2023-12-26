import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
import { TamTru, Dashboard, NhanKhau, KhoanThu, NopTien, Login, Account }  
  from './pages';

import Navbar from './component/navbar/Navbar'
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import './App.css';

const PrivateRouteAccount = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && currentUser.RoleId === 0;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};
const PrivateRouteHoKhauTamTru = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && [1, 2, 3].includes(currentUser?.RoleId);

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};
const PrivateRouteKhoanThuNopTien = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && [1, 2, 4].includes(currentUser?.RoleId);

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/account" exact element={<PrivateRouteAccount element = {Account}/>} />
        <Route path="/khoanthu" exact element={<PrivateRouteKhoanThuNopTien element={KhoanThu} />} />
        <Route path="/noptien"  exact element={<PrivateRouteKhoanThuNopTien element={NopTien} />}  />
        <Route path="/hokhau" exact element={<PrivateRouteHoKhauTamTru element = {NhanKhau} />} />
        <Route path="/tamtru" exact element={<PrivateRouteHoKhauTamTru element={TamTru} />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </Router>
    
  );
}

export default App;