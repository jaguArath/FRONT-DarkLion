import React, { useState, useEffect, useRef } from "react";
import frente from "../assets/agregar-logo/frente.jpeg";

export default function Shirt2D({
  colors = {},
  modelo = "cuello-redondo",
  shirtImage = null,
  shirtImageBack = null,
  shirtImageLeftSleeve = null,
  shirtImageRightSleeve = null,
}) {
  const torsoColor = colors.torso || "#ffffff";
  const sleevesColor = colors.sleeves || "#ffffff";
  const collarColor = colors.collar || "#ffffff";
  const backColor = colors.back || "#ffffff";

  // Estado para la imagen seleccionada en la galería
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    // Por defecto mostrar la imagen frontal
    if (shirtImage) {
      setSelectedImage(shirtImage);
      setSelectedLabel("FRENTE");
    }
  }, [shirtImage]);

  // Obtener nombre del modelo
  const getModeloNombre = (modeloKey) => {
    const nombres = {
      "cuello-v": "CUELLO V",
      "cuello-redondo": "CUELLO REDONDO",
      "cuello-camisola": "CAMISOLA",
      "cuello-tank-top": "TANK TOP",
    };
    return nombres[modeloKey] || "MODELO";
  };

  const handleImageClick = (image, label) => {
    setSelectedImage(image);
    setSelectedLabel(label);
  };

  return (
    <div className="flex flex-col gap-5 p-4 w-full max-w-4xl mx-auto">
      {/* Tipo de modelo */}
      {/* <div className="text-center">
        <p className="text-sm font-semibold text-gray-600">Modelo:</p>
        <p className="text-lg font-bold text-purple-700">
          {getModeloNombre(modelo)}
        </p>
      </div> */}

      {/* IMAGEN GRANDE */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">{selectedLabel}</p>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          {selectedImage ? (
            <img
              src={selectedImage}
              className="w-full object-contain h-auto"
              style={{ maxHeight: "500px", maxWidth: "500px", minHeight: "300px" }}
              alt={`Camisa 3D - ${selectedLabel}`}
            />
          ) : (
            <div className="w-80 h-96 bg-gray-100 flex items-center justify-center text-gray-400">
              Cargando vista 2D...
            </div>
          )}
        </div>
      </div>

      {/* MINIATURAS */}
      <div className="flex gap-4 justify-center flex-wrap">
        {/* Miniatura FRENTE */}
        {shirtImage && (
          <div
            onClick={() => handleImageClick(shirtImage, "FRENTE")}
            className={`cursor-pointer rounded-lg border-2 transition-all ${
              selectedLabel === "FRENTE"
                ? "border-purple-600 shadow-lg"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <img
              src={shirtImage}
              className="w-20 h-20 object-cover rounded"
              alt="Miniatura Frente"
            />
            <p className="text-xs text-center mt-1 font-semibold">FRENTE</p>
          </div>
        )}

        {/* Miniatura MANGA IZQUIERDA */}
        {shirtImageLeftSleeve && (
          <div
            onClick={() => handleImageClick(shirtImageLeftSleeve, "MANGA IZQ")}
            className={`cursor-pointer rounded-lg border-2 transition-all ${
              selectedLabel === "MANGA IZQ"
                ? "border-purple-600 shadow-lg"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <img
              src={shirtImageLeftSleeve}
              className="w-20 h-20 object-cover rounded"
              alt="Miniatura Manga Izquierda"
            />
            <p className="text-xs text-center mt-1 font-semibold">MANGA IZQ</p>
          </div>
        )}

        {/* Miniatura ATRÁS */}
        {shirtImageBack && (
          <div
            onClick={() => handleImageClick(shirtImageBack, "ATRÁS")}
            className={`cursor-pointer rounded-lg border-2 transition-all ${
              selectedLabel === "ATRÁS"
                ? "border-purple-600 shadow-lg"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <img
              src={shirtImageBack}
              className="w-20 h-20 object-cover rounded"
              alt="Miniatura Atrás"
            />
            <p className="text-xs text-center mt-1 font-semibold">ATRÁS</p>
          </div>
        )}

        {/* Miniatura MANGA DERECHA */}
        {shirtImageRightSleeve && (
          <div
            onClick={() => handleImageClick(shirtImageRightSleeve, "MANGA DER")}
            className={`cursor-pointer rounded-lg border-2 transition-all ${
              selectedLabel === "MANGA DER"
                ? "border-purple-600 shadow-lg"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <img
              src={shirtImageRightSleeve}
              className="w-20 h-20 object-cover rounded"
              alt="Miniatura Manga Derecha"
            />
            <p className="text-xs text-center mt-1 font-semibold">MANGA DER</p>
          </div>
        )}
      </div>

      {/* Leyenda de colores */}
    </div>
  );
}
