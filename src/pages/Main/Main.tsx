import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectAuth } from "../../contexts/slices/authSlice";

import Template from "../../components/Template";
import ReactDOM from 'react-dom';



const Main: React.FC = () => {
  console.log("FACKKK");

  const { authResult } = useSelector(selectAuth);

  return (
    <>
      <Template listSubMenu={authResult.data.permission}></Template>;
    </>
    );
    
    
};

export default Main;
