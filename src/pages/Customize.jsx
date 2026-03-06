import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ShirtViewer3D from "../components/ShirtViewer3D";

import MarcaAgua from "../assets/MarcaAgua.png";

export default function Customize() {
  const { modelo } = useParams();

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
    <section
      className="min-h-screen relative flex">
      <aside
        className="absolute inset-0 opacity-30 bg-top bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${MarcaAgua})`,
        }}
        aria-hidden="true"
      />

      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        {/* title could be shown here if desired */}

        <section className="w-full max-w-xl h-96">
          <ShirtViewer3D />
        </section>
      </main>
    </section>
  );
}