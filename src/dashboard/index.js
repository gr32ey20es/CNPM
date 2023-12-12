import { Routes, Route } from "react-router-dom";
import DashboardProvider from "./provider"
import SidebarV1 from "./scenes/global/Sidebar.jsx";
import HoKhau from "./scenes/hokhau";
import "./index.css";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KhoanThu from "./scenes/khoanthu/KhoanThu";
import NopTien from "./scenes/noptien/NopTien.jsx";
import ThongKe from "./scenes/thongke/index.jsx";
function Dashboard() {
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => navigate('/dashboard'), []);

    return (
        <div className="App">
            <DashboardProvider>
                <SidebarV1 />
                <main>
                    <Routes>
                        <Route path="/" element={<></>} />
                        <Route path="/hokhau" element={<HoKhau />} />
                        <Route path="/khoanthu" element = {<KhoanThu/>}/>
                        <Route path = "/noptien" element = {<NopTien/>}/>
                        <Route path = "/thongke" element={<ThongKe/>}/>
                    </Routes>
                </main>
            </DashboardProvider>
        </div> 

    );
}

export default Dashboard;