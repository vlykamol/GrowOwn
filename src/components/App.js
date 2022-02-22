import { AuthProvider } from "../context/AuthContext";
import Dashbord from "./Dashbord";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Dashbord /></PrivateRoute>}/>
          <Route exact path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
