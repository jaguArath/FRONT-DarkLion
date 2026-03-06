import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Customize from "../pages/Customize";
import SelectedData from "../pages/SelectedData";
import AgregarLogo from "../components/AgregarLogo";

const RouterApp = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalizar/:modelo" element={<Customize />} />
        <Route path="/agregar-logo" element={<AgregarLogo />} />
        <Route path="/datos-seleccionados" element={<SelectedData />} />
        
      </Routes>

      <Footer />
    </>
  );
};

export default RouterApp;
