import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarcaAgua from "../assets/MarcaAgua.png";
import SelectedDataSidebar from "../components/SelectedDataSidebar";
import ContactForm from "../components/ContactForm";
import frente from "../assets/agregar-logo/frente.jpeg";

export default function SelectedData() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // redirect to home if state missing
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  const design = state?.design || {};
  const players = state?.players || [];
  const modelo = state?.modelo || "";

  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });
  const [sending, setSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const handleEdit = useCallback(() => {
    if (modelo) {
      navigate(`/personalizar/${modelo}`, {
        state: { design, players, modelo },
      });
    }
  }, [modelo, navigate, design, players]);

  const handleContactChange = useCallback((field, value) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validateContactData = () => {
    const errors = { nombre: "", telefono: "", correo: "" };
    let isValid = true;

    // Validar nombre
    if (!contactData.nombre || contactData.nombre.trim() === "") {
      errors.nombre = "El nombre es obligatorio";
      isValid = false;
    } else if (contactData.nombre.trim().length < 3) {
      errors.nombre = "El nombre debe tener al menos 3 caracteres";
      isValid = false;
    }

    // Validar teléfono
    if (!contactData.telefono || contactData.telefono.trim() === "") {
      errors.telefono = "El teléfono es obligatorio";
      isValid = false;
    } else {
      const digitsOnly = contactData.telefono.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        errors.telefono = "El teléfono debe contener exactamente 10 dígitos";
        isValid = false;
      }
    }

    // Validar correo
    if (!contactData.correo || contactData.correo.trim() === "") {
      errors.correo = "El correo es obligatorio";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.correo)) {
      errors.correo = "Ingresa un correo válido";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const preparePayload = () => {
    // Aggregate tallas by tipo and talla
    const tallasMap = {};
    players.forEach((p) => {
      const tipo =
        p.gender === "H" ? "CABALLERO" : p.gender === "M" ? "DAMA" : p.gender;
      const talla = p.jersey || "";
      const key = `${tipo}-${talla}`;
      if (!tallasMap[key]) {
        tallasMap[key] = { tipo, talla, cantidad: 0 };
      }
      tallasMap[key].cantidad += p.quantity || 0;
    });
    const tallas = Object.values(tallasMap);

    return {
      name: contactData.nombre,
      email: contactData.correo,
      phone_number: parseInt(contactData.telefono.replace(/\D/g, "")),
      id_product: 1,
      design_file_url: design.design || "https://example.com/dummy.png",
      tela: design.fabricType || "Default",
      tallas,
      listado: players.map((p) => {
        const item = {
          nombre: p.name || "",
          talla: p.jersey || "",
          cantidad: p.quantity || 0,
          genero:
            p.gender === "H" ? "CABALLERO" : p.gender === "M" ? "DAMA" : p.gender,
        };
        if (p.number !== undefined && p.number !== null && p.number !== "") {
          item.numero = p.number;
        }
        return item;
      }),
    };
  };

  const handleSendUniform = async () => {
    // Validar datos de contacto
    if (!validateContactData()) {
      return;
    }

    setSending(true);

    const payload = preparePayload();
    console.log("Payload being sent:", payload);

    try {
      const res = await fetch(
        "https://api-darklion.onrender.com/api/designs/client-and-design",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Status ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log("Respuesta API:", data);
      alert("Uniforme enviado con éxito!");
      setShowContactForm(false);
      // Reset form
      setContactData({ nombre: "", telefono: "", correo: "" });
      setFieldErrors({ nombre: "", telefono: "", correo: "" });
    } catch (err) {
      console.error("Error sending uniform:", err);
      setFieldErrors((prev) => ({
        ...prev,
        correo: `Error al enviar: ${err.message}`,
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      style={{ fontFamily: "Montserrat1" }}
      className="min-h-screen relative flex"
    >
      <aside
        className="absolute inset-0 opacity-30 bg-top bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${MarcaAgua})`,
        }}
        aria-hidden="true"
      />

      {/* VISTA 1: Datos Seleccionados */}
      {!showContactForm && (
        <>
          {/* Data Sidebar */}
          <aside
            aria-label="Panel de datos seleccionados"
            className="
            sticky
            top-24
            left-0
            w-90
            max-h-[calc(110vh-200px)]
            backdrop-blur
            rounded-2xl
            shadow-xl
            p-5
            overflow-y-auto
            z-20
            m-5
          "
          >
            <nav className="space-y-6">
              {/* Configuración */}
              <div>
                <h3 className="text-2xl font-bold text-center py-8 rounded-t-2xl bg-personalizado to-purple-40 -mx-5 mb-8 ">
                  MI UNIFORME PERSONALIZADO
                </h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <strong>Tela:</strong> {design.fabricType || "—"}
                  </li>
                  <li>
                    <strong>Diseño:</strong>{" "}
                    {design.design ? (
                      <img
                        src={design.design}
                        alt="design"
                        className="w-12 h-12 inline"
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                  <li>
                    <strong>Equipo:</strong> {design.teamName || "—"}
                  </li>
                  <li>
                    <strong>Fuente equipo:</strong> {design.teamFont || "—"}
                  </li>
                  <li>
                    <strong>Jugador:</strong> {design.playerName || "—"}
                  </li>
                  <li>
                    <strong>Fuente jugador:</strong> {design.playerFont || "—"}
                  </li>
                  <li>
                    <strong>Logo:</strong>{" "}
                    {design.logoUrl ? (
                      <img
                        src={design.logoUrl}
                        alt="logo"
                        className="w-12 h-12 inline"
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                </ul>
              </div>

              {/* Colores */}
              <div>
                <h3 className="font-bold text-lg mb-3">Colores</h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <strong>Cuerpo:</strong>{" "}
                    {design.colors?.torso ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{ backgroundColor: design.colors.torso }}
                        title={design.colors.torso}
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                  <li>
                    <strong>Espalda:</strong>{" "}
                    {design.colors?.back ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{ backgroundColor: design.colors.back }}
                        title={design.colors.back}
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                  <li>
                    <strong>Mangas:</strong>{" "}
                    {design.colors?.sleeves ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{ backgroundColor: design.colors.sleeves }}
                        title={design.colors.sleeves}
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                  <li>
                    <strong>Cuello:</strong>{" "}
                    {design.colors?.collar ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{ backgroundColor: design.colors.collar }}
                        title={design.colors.collar}
                      />
                    ) : (
                      "—"
                    )}
                  </li>
                </ul>
              </div>

              {/* Jugadores */}
              <div>
                <h3 className="font-bold text-lg mb-3">Jugadores</h3>
                {players.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {players.map((p, i) => (
                      <div
                        key={p.id || i}
                        className="bg-purple-100 p-2 rounded"
                      >
                        <p>
                          <strong>{p.name || `Jugador ${i + 1}`}</strong>
                        </p>
                        <p>
                          Género: {p.gender || "—"} | Jersey: {p.jersey || "—"}{" "}
                          | Nº {p.number || "—"}
                        </p>
                        <p>Cant: {p.quantity}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs">Sin jugadores</p>
                )}
              </div>

              {/* Botón Editar */}
              <button
                onClick={handleEdit}
                className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Editar Uniforme
              </button>

              {/* Botón Enviar */}
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Enviar Uniforme
              </button>
            </nav>
          </aside>

          <main className="flex-1 flex flex-col items-center p-5">
            {/* Camisa grande */}
            <section className="w-full flex flex-col items-center justify-center grow">
              <div className="h-100 flex items-center justify-center">
                <img
                  src={frente}
                  alt="Camisa principal"
                  className="h-full object-contain"
                />
              </div>
            </section>

            {/* Modelos abajo */}
            <section className="w-full flex justify-center mt-4">
              <div className="flex gap-12">
                <img
                  src={frente}
                  alt="Modelo frente"
                  className="h-28 object-contain cursor-pointer hover:scale-105 transition"
                />

                <img
                  src={frente}
                  alt="Modelo espalda"
                  className="h-28 object-contain cursor-pointer hover:scale-105 transition"
                />
              </div>
            </section>
          </main>
        </>
      )}

      {/* VISTA 2: Formulario de Contacto */}
      {showContactForm && (
        <>
          <ContactForm
            data={contactData}
            onChange={handleContactChange}
            onCancel={() => setShowContactForm(false)}
            onSubmit={handleSendUniform}
            sending={sending}
            fieldErrors={fieldErrors}
          />

          {/* Main Content - Shirt Models Display */}
          <main className="flex-1 flex flex-col items-center p-8">
            {/* Camisa grande */}
            <section className="w-full flex justify-center items-center grow">
              <div className="h-90 flex items-center justify-center">
                <img
                  src={frente}
                  alt="Camisa principal"
                  className="h-full object-contain"
                />
              </div>
            </section>

            {/* Modelos abajo */}
            <section className="w-full flex justify-center pb-10">
              <div className="flex gap-12">
                <img
                  src={frente}
                  alt="Modelo frente"
                  className="h-28 object-contain cursor-pointer hover:scale-105 transition"
                />

                <img
                  src={frente}
                  alt="Modelo espalda"
                  className="h-28 object-contain cursor-pointer hover:scale-105 transition"
                />
              </div>
            </section>
          </main>
        </>
      )}
    </section>
  );
}
