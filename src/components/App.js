import { AuthProvider } from "../context/AuthContext";
import Dashbord from "./Dashbord";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile";
import UpdateProfile from "./UpdateProfile"
import Timeline from "./Timeline";
import AddItem from "./AddItem";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Timeline/></PrivateRoute>}/>
          <Route exact path="/dashbord" element={<PrivateRoute><Dashbord /></PrivateRoute>}/>
          <Route exact path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>}/>
          <Route exact path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-item" element={<PrivateRoute><AddItem/></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
