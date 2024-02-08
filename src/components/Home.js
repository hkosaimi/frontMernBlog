import React from "react";
import Navbar from "./Navbar";
import "./home.css";
function Home() {
  const cat = [
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
  ];
  return (
    <>
      <div className="home">
        <Navbar />
        <div className="hero">
          <h1>Something about everything</h1>
          <div className="cat-container">
            {cat.map((i) => (
              <span>{i}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
