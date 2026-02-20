import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "../pages/Home";

import CuelloV from "../Design/CuelloV";
import Redondo from "../Design/Redondo";
import Camisola from "../Design/Camisola";
import TankTop from "../Design/TankTop";

const RouterApp = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuello-v" element={<CuelloV />} />
        <Route path="/cuello-redondo" element={<Redondo />} />
        <Route path="/cuello-camisola" element={<Camisola />} />
        <Route path="/cuello-tank-top" element={<TankTop />} />
      </Routes>

      <Footer />
    </>
  );
};

export default RouterApp;
