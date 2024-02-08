import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem 4rem", height: "100vh" }}>
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>I'm Hussain Al-Osaimi</h1>
        <h2 style={{ textAlign: "center" }}>
          A computer engineering student passionate in front-end web development{" "}
        </h2>
      </div>
    </>
  );
}

export default About;
