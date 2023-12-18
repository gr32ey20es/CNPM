import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
const App = () => {
    return (
        <Routes>
            <Route path="dashboard/*" element={<Dashboard />}/>
        </Routes>
    )
}

export default App;