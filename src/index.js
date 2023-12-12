import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.js';
import "./index.css";
import ThongKe from "./dashboard/scenes/thongke/index.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)