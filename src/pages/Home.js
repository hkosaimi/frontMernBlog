import React from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import { motion } from "framer-motion";
function Home() {
  /*  const cat = [
    "MERN stack",
    "JavaScript",
    "Python",
    "GIT",
    "GitHub",
    "Front-end",
    "Back-end",
    "Networking",
    "CSS",
    "HTML",
    "Software",
    "OS",
    "Hardware",
    "Embedded systems",
  ]; */
  return (
    <>
      <div className="home">
        <Navbar />
        <div className="flex  flex-col justify-center text-center  gap-5 px-[4rem]">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            className="text-[30px] font-[Poppins] mt-[100px]">
            Something About Everything
          </motion.h1>
        </div>
      </div>
    </>
  );
}

export default Home;
