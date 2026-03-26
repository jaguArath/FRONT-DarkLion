import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarcaAgua from "../assets/MarcaAgua.png";

export default function SendImages() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const clientData = state?.clientData || {};

  const handleSendEmail = () => {
    const subject = `Imágenes para pedido - ${clientData.name || "Cliente"}`;

    const body = `Hola,

Adjunto envío mis imágenes y logos para mi uniforme personalizado.

Nombre: ${clientData.name || ""}
Email: ${clientData.email || ""}
Teléfono: ${clientData.phone_number || ""}

Gracias.`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=darklionteamsoftware@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <section
      style={{ fontFamily: "Montserrat1" }}
      className="min-h-screen relative flex flex-col items-center justify-center p-5"
    >
      <aside
        className="absolute inset-0 opacity-30 bg-top bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${MarcaAgua})`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Título de éxito */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-green-600">
            ¡Uniforme Enviado con Éxito! ✓
          </h1>
          <p className="text-gray-600 text-lg">
            Tu pedido ha sido registrado correctamente.
          </p>
        </div>

        {/* Datos del cliente */}
        <div className="bg-purple-50 rounded-lg p-6 text-left space-y-3">
          <h3 className="font-bold text-lg text-purple-700">
            Datos del cliente:
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Nombre:</strong> {clientData.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {clientData.email || "N/A"}
            </p>
            <p>
              <strong>Teléfono:</strong> {clientData.phone_number || "N/A"}
            </p>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 rounded-lg p-6 space-y-3 text-left">
          <h3 className="font-bold text-lg text-blue-700">
            Próximo paso: Envía tus imágenes
          </h3>
          <p className="text-gray-700">
            Para completar tu pedido, necesitamos que envíes{" "}
            <strong>todas las imágenes, logos y diseños</strong> que utilizaste
            o subiste para tu uniforme personalizado.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Logo de tu equipo (si lo utilizaste)</li>
            <li>Diseños personalizados</li>
            <li>Imágenes del uniforme personalizado</li>
            <li>Cualquier otro archivo importante</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleSendEmail}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition transform hover:scale-105 uppercase"
          >
            📧 Enviar Correo con Imágenes
          </button>
          {/* <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition transform hover:scale-105"
          >
            Volver al Inicio
          </button> */}
        </div>

        {/* Nota adicional */}
        <div className="border-t pt-4 text-xs text-gray-600">
          <p>
            💡 <strong>Nota:</strong> Se abrirá tu cliente de correo. Si no se
            abre automáticamente, envía tus imágenes a{" "}
            <strong>darklionteamsoftware@gmail.com</strong> con el asunto
            incluyendo tu nombre.
          </p>
        </div>
      </div>
    </section>
  );
}
