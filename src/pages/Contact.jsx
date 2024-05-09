import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";
import Footer from "../components/Footer";
function Contact() {
  return (
    <>
      <Navbar />
      <div className="py-[2rem]  px-[4rem] text-[30px] text-center flex flex-col gap-5 justify-normal  font-[Poppins]">
        <h1>If you have any questions/suggestions, feel free to contact me through Tik Tok</h1>
        <div className="  flex justify-center ">
          <Link to="https://www.tiktok.com/@webdevx?lang=ar">
            <FaTiktok />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Contact;
