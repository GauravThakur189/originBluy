import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")}`,
  };
  

  return (
    <>
      
      
      <div>
        <button
          className=" bg-gray-600 w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
