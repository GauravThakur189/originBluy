import React, { useEffect } from "react";
import Home from "./pages/AllPhotos";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import FavoritePhotos from "./pages/FavoritePhotos";
import AllPhotos from "./pages/AllPhotos";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

   useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn===false){
      navigate('/signup');
     }
   }, [])

  return (
    <div className=" bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<AllPhotos />} />
        <Route path="/favorite" element={<FavoritePhotos />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
