import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FrenteImg from "../assets/agregar-logo/frente.jpeg";
import EspaldaImg from "../assets/agregar-logo/espalda.jpeg";
import FrenteIcon from "../assets/agregar-logo/FrenteIcon.png";
import EspaldaIcon from "../assets/agregar-logo/EspaldaIcon.png";
import MangasIcon from "../assets/agregar-logo/MangasIcon.png";
import ConfirmDialog from "./ConfirmDialog";
import SuccessMessage from "./SuccessMessage";

export default function AgregarLogo() {
  const { modelo } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("frente");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [designs, setDesigns] = useState({
    frente: { color: "#ffffff", logo: null },
    espalda: { color: "#ffffff", logo: null },
    mangas: { color: "#ffffff", logo: null },
  });

  const current = designs[view];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDesigns({
      ...designs,
      [view]: {
        ...current,
        logo: URL.createObjectURL(file),
      },
    });
  };

  const handleColorChange = (color) => {
    setDesigns({
      ...designs,
      [view]: {
        ...current,
        color,
      },
    });
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setDesigns({
      frente: { color: "#ffffff", logo: null },
      espalda: { color: "#ffffff", logo: null },
    });
    setSuccessTitle("Cancelar edición");
    setSuccessMessage("Se ha cancelado la edición");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate(`/personalizar/${modelo}`);
    }, 2000);
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const handleConfirmSave = () => {
    setShowSaveConfirm(false);
    console.log("Guardar diseño:", designs);
    setSuccessTitle("Guardado con éxito");
    setSuccessMessage("Tus cambios han sido guardados correctamente");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate(`/personalizar/${modelo}`);
    }, 2000);
  };

  const shirtImage = view === "frente" ? FrenteImg : EspaldaImg;

  return (
    <div
      className="flex h-screen bg-gray-200"
      style={{
        backgroundImage: "url('/darklion-pattern.png')",
        backgroundSize: "300px",
        backgroundRepeat: "repeat",
      }}
    >
      {/* TOOLBAR */}
      <aside className="w-24 bg-white/80 backdrop-blur-md shadow-md flex flex-col items-center py-6 space-y-6 rounded-r-2xl">
        <label className="flex flex-col items-center gap-1 cursor-pointer">
          <span className="text-2xl">📤</span>
          <span className="text-xs">Subidos</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <input
          type="color"
          value={current.color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </aside>

      {/* EDITOR CENTRAL */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-90">
          {/* Imagen base */}
          <img
            src={shirtImage}
            alt="Camisa"
            className="w-full object-contain"
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: current.color,
              mixBlendMode: "multiply",
            }}
          />

          {/* Logo */}
          {current.logo && (
            <img
              src={current.logo}
              alt="Logo"
              className="absolute top-1/3 left-1/2 w-32 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>

        {/* BOTONES FRENTE / ESPALDA / MANGAS */}
        <div className="flex gap-8 mt-10">
          <button
            onClick={() => setView("frente")}
            className="flex flex-col items-center gap-2 transition-all"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                view === "frente" ? "bg-purple-600 text-white" : "bg-gray-300"
              }`}
            >
              <img src={FrenteIcon} alt="Frente" className="w-8 h-8" />
            </div>
            <span className="text-sm font-semibold text-gray-700">FRENTE</span>
          </button>

          <button
            onClick={() => setView("espalda")}
            className="flex flex-col items-center gap-2 transition-all"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                view === "espalda" ? "bg-purple-600 text-white" : "bg-gray-300"
              }`}
            >
              <img src={EspaldaIcon} alt="Espalda" className="w-8 h-8" />
            </div>
            <span className="text-sm font-semibold text-gray-700">ESPALDA</span>
          </button>

          <button
            onClick={() => setView("mangas")}
            className="flex flex-col items-center gap-2 transition-all"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                view === "mangas" ? "bg-purple-600 text-white" : "bg-gray-300"
              }`}
            >
              <img src={MangasIcon} alt="Mangas" className="w-8 h-8" />
            </div>
            <span className="text-sm font-semibold text-gray-700">MANGAS</span>
          </button>
        </div>
      </div>

      {/* VISTA PREVIA DERECHA */}
      <div className="w-80 flex flex-col items-center justify-center gap-6">
        <img src={shirtImage} alt="Preview" className="w-72 drop-shadow-xl" />

        <div className="w-72 flex flex-col gap-3">
          <button
            onClick={handleCancel}
            className="w-full bg-purple-200 py-3 rounded-xl text-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="w-full bg-purple-700 text-white py-3 rounded-xl text-lg"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* DIÁLOGO DE CONFIRMACIÓN GUARDAR */}
      <ConfirmDialog
        isOpen={showSaveConfirm}
        title="Confirmar guardado"
        message="¿Deseas guardar los cambios?"
        confirmText="Guardar cambios"
        cancelText="Volver"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowSaveConfirm(false)}
      />

      {/* DIÁLOGO DE CONFIRMACIÓN CANCELAR */}
      <ConfirmDialog
        isOpen={showCancelConfirm}
        title="Cancelar edición"
        message="¿Estás seguro de que deseas cancelar? Esta acción no se puede deshacer"
        confirmText="Cancelar"
        cancelText="Volver"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelConfirm(false)}
      />

      {/* MENSAJE DE ÉXITO */}
      <SuccessMessage
        isOpen={showSuccessMessage}
        title={successTitle}
        message={successMessage}
        onClose={() => setShowSuccessMessage(false)}
      />
    </div>
  );
}
