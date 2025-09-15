import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PartnerDashboard from "./pages/PartnerDashboard";
import MCPDashboard from "./pages/MCPDashboard";

function App() {
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/partner-dashboard" element={<ProtectedRoute><PartnerDashboard/></ProtectedRoute>}></Route>
        <Route path="/mcp-dashboard" element={<ProtectedRoute><MCPDashboard /></ProtectedRoute>} />
      </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
