import Navbar from "@/components/common/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";
import Hero from "@/pages/Home/Hero";
import Sections from "@/pages/Home/Sections";

function Mainlayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sections />
    </>
  );
}

export default Mainlayout;
