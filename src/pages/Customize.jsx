import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ShirtViewer3D from "../components/ShirtViewer3D";

import MarcaAgua from "../assets/MarcaAgua.png";

export default function Customize() {
  const { modelo } = useParams();
  const [colors, setColors] = useState({
    torso: "",
    back: "",
    sleeves: "",
    collar: "",
  });
  const [design, setDesign] = useState("");
  const [visiblePlayerId, setVisiblePlayerId] = useState(null);
  const [visiblePlayer, setVisiblePlayer] = useState(null);
  const shirtRef = useRef(null);

  let titulo = "";

  switch (modelo) {
    case "cuello-v":
      titulo = "Este es Cuello V";
      break;
    case "cuello-redondo":
      titulo = "Este es Cuello Redondo";
      break;
    case "cuello-camisola":
      titulo = "Este es Camisola";
      break;
    case "cuello-tank-top":
      titulo = "Este es Tank Top";
      break;
    default:
      titulo = "Modelo no encontrado";
  }

  return (
    <section className="min-h-screen relative flex">
      <aside
        className="absolute inset-0 opacity-30 bg-top bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${MarcaAgua})`,
        }}
        aria-hidden="true"
      />

      <Sidebar
        colors={colors}
        setColors={setColors}
        design={design}
        setDesign={setDesign}
        modelo={modelo}
        shirtRef={shirtRef}
        visiblePlayerId={visiblePlayerId}
        setVisiblePlayerId={setVisiblePlayerId}
        setVisiblePlayer={setVisiblePlayer}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        {/* title could be shown here if desired */}
        <h1 className="text-2xl font-semibold">{titulo}</h1>
        <section className="w-140 max-w-xl h-95">
          {/* <section className="w-full max-w-2xl h-[500px]"> */}
          <ShirtViewer3D 
            ref={shirtRef} 
            colors={colors}
            design={design}
            visiblePlayer={visiblePlayer}
          />
        </section>
      </main>
    </section>
  );
}
