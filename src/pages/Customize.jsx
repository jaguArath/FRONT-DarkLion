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
    manga_izquierda: "",
    manga_derecha: "",
    collar: "",
  });
  const [designs, setDesigns] = useState({
    torso: { design: "", visible: false },
    back: { design: "", visible: false },
    manga_izquierda: { design: "", visible: false },
    manga_derecha: { design: "", visible: false },
    collar: { design: "", visible: false },
  });
  const [design, setDesign] = useState(""); // Mantener para compatibilidad
  const [visiblePlayerId, setVisiblePlayerId] = useState(null);
  const [visiblePlayer, setVisiblePlayer] = useState(null);
  const [nameColor, setNameColor] = useState("rgb(0, 0, 0)");
  const [nameFont, setNameFont] = useState("ARBORIA");
  const [numberColor, setNumberColor] = useState("rgb(0, 0, 0)");
  const [numberFont, setNumberFont] = useState("ARBORIA");
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
    <section className="min-h-screen relative flex flex-col lg:flex-row gap-4 lg:gap-0">
      <aside
        className="absolute inset-0 opacity-30 bg-top bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${MarcaAgua})`,
        }}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div className="w-full lg:w-auto lg:flex lg:flex-col lg:items-center lg:justify-center">
        <section className="w-full lg:w-140 h-auto lg:h-95 px-4 lg:px-0">
          <Sidebar
            colors={colors}
            setColors={setColors}
            design={design}
            setDesign={setDesign}
            designs={designs}
            setDesigns={setDesigns}
            modelo={modelo}
            shirtRef={shirtRef}
            visiblePlayerId={visiblePlayerId}
            setVisiblePlayerId={setVisiblePlayerId}
            setVisiblePlayer={setVisiblePlayer}
            nameColor={nameColor}
            setNameColor={setNameColor}
            nameFont={nameFont}
            setNameFont={setNameFont}
            numberColor={numberColor}
            setNumberColor={setNumberColor}
            numberFont={numberFont}
            setNumberFont={setNumberFont}
          />
        </section>
      </div>

      {/* Modelo 3D */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 space-y-6">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold text-center">{titulo}</h1>
        <section className="w-full max-w-xs md:max-w-sm lg:w-140 h-80 md:h-96 lg:h-95">
          <ShirtViewer3D
            ref={shirtRef}
            colors={colors}
            design={design}
            designs={designs}
            visiblePlayer={visiblePlayer}
            nameColor={nameColor}
            nameFont={nameFont}
            numberColor={numberColor}
            numberFont={numberFont}
          />
        </section>
      </main>
    </section>
  );
}
