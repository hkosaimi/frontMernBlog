import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <div className="flex  px-[1rem] lg:px-[10rem]   justify-between lg:justify-around ">
        <div className="flex flex-col  ">
          <h1 className="text-[25px] lg:text-[30px] mb-2">i cosmic dust</h1>
          <p className="text-[15px] lg:text-[20px] text-center">Thanks for reading</p>
        </div>
        <div className="flex flex-col lg:[&_a]:mb-2 ">
          <h1 className="text-[18px] lg:text-[20px]  text-gray-500 mb-5">Links</h1>
          <div className="flex text-[14px] lg:text-[20px] flex-wrap  gap-4">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      <p className="text-[15px] text-gray-500 text-center mb-5 mt-8">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  );
}

export default Footer;
