import { AuthProvider } from "../context/AuthContext";
import Dashbord from "./Dashbord";
import Signup from "./user/Signup";
import Login from "./user/Login";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import CreateProfile from "./user/CreateProfile";
import UpdateProfile from "./user/UpdateProfile"
import Timeline from "./Timeline";
import AddItem from "./user/AddItem";
import SellerProfile from "./SellerProfile"

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Timeline/></PrivateRoute>}/>
          <Route exact path="/dashbord" element={<PrivateRoute><Dashbord /></PrivateRoute>}/>
          <Route exact path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>}/>
          <Route exact path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-item" element={<PrivateRoute><AddItem/></PrivateRoute>}/>
          <Route path="/seller-profile/:profileId" element={<PrivateRoute><SellerProfile/></PrivateRoute>}/>
        </Routes>
        </LocalizationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
