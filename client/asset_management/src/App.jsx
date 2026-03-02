import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/homepage";
import SignUp from "./pages/Signup/signUp";
import SignIn from "./pages/SignIn/signIn";
import BuildingOverView from "./pages/building/buildingOverview";
import 'preline';
import Admin from "./pages/Admin/AdminPage";
import UserProfile from "./pages/User/userProfile";

const App = () => {
  return (
    <Fragment>
      <div>
        <Routes>
          <Route path="landingPage" element={<Home/>}/>
          <Route path="SignUp" element={<SignUp/>}/>
          <Route path="SignIn" element={<SignIn/>}/>
          <Route path="Overview" element={<BuildingOverView/>}/>
          <Route path="Admin" element={<Admin/>}/>
          <Route path="User" element={<UserProfile/>}/>
        </Routes>
      </div>
    </Fragment>

  )
}
export default App;