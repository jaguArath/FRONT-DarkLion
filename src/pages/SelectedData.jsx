import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarcaAgua from "../assets/MarcaAgua.png";
import ContactForm from "../components/ContactForm";
import Shirt2D from "../components/Shirt2D";
import SelectedDataSidebar from "../components/SelectedDataSidebar";
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
      const digitsOnly = contactData.telefono.replace(/\D/g, "");
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

  // Función para combinar 4 imágenes en una sola
  const combineImagesIntoOne = (
    imageFront,
    imageBack,
    imageLeftSleeve,
    imageRightSleeve,
  ) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Dimensiones de cada imagen individual
      const imageWidth = 500;
      const imageHeight = 500;

      // Configurar canvas para 2x2 grid
      canvas.width = imageWidth * 2;
      canvas.height = imageHeight * 2;

      // Fondo blanco
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cargar y dibujar las 4 imágenes
      let imagesLoaded = 0;
      const images = [
        { data: imageFront, x: 0, y: 0, label: "Frente" },
        { data: imageRightSleeve, x: imageWidth, y: 0, label: "Manga Der." },
        { data: imageBack, x: 0, y: imageHeight, label: "Atrás" },
        {
          data: imageLeftSleeve,
          x: imageWidth,
          y: imageHeight,
          label: "Manga Izq.",
        },
      ];

      images.forEach((img) => {
        const imgElement = new Image();
        imgElement.crossOrigin = "anonymous";

        imgElement.onload = () => {
          // Dibujar imagen
          ctx.drawImage(imgElement, img.x, img.y, imageWidth, imageHeight);

          // Dibujar etiqueta
          ctx.fillStyle = "black";
          ctx.font = "16px Arial";
          ctx.fillText(img.label, img.x + 10, img.y + 25);

          imagesLoaded++;
          if (imagesLoaded === 4) {
            // Convertir canvas a blob
            canvas.toBlob((blob) => {
              resolve(blob);
            }, "image/png");
          }
        };

        imgElement.onerror = () => {
          imagesLoaded++;
          if (imagesLoaded === 4) {
            // Si hay error en alguna imagen, continuar de todas formas
            canvas.toBlob((blob) => {
              resolve(blob);
            }, "image/png");
          }
        };

        imgElement.src = img.data;
      });
    });
  };

  const convertGenderToSpanish = (gender) => {
    const generoMap = {
      H: "CABALLERO",
      M: "DAMA",
      I: "INFANTIL",
    };
    return generoMap[gender] || gender;
  };

  // Mapeo de tallas infantiles a tallas de adulto para el JSON
  const mapInfantilTallaToAdult = (talla) => {
    const tallaMap = {
      2: "XCH",
      4: "CH",
      6: "MD",
      8: "GD",
      10: "XL",
      12: "XXL",
      14: "XXXL",
    };
    return tallaMap[talla] || talla;
  };

  const preparePayload = () => {
    // Aggregate tallas by tipo and talla
    const tallasMap = {};
    console.log("Jugadores a procesar:", players);

    players.forEach((p) => {
      const tipo = convertGenderToSpanish(p.gender);
      let talla = p.jersey || "";

      // Si es infantil, mapear la talla a formato de adulto
      if (p.gender === "I") {
        talla = mapInfantilTallaToAdult(talla);
      }

      const key = `${tipo}-${talla}`;
      console.log(
        `Procesando jugador: ${p.name}, gender: ${p.gender}, tipo: ${tipo}, talla original: ${p.jersey}, talla mapeada: ${talla}, quantity: ${p.quantity}`,
      );

      if (!tallasMap[key]) {
        tallasMap[key] = { tipo, talla, cantidad: 0 };
      }
      tallasMap[key].cantidad += p.quantity || 0;
    });

    console.log("Tallas map después de procesar:", tallasMap);

    // Solo incluir tallas que tengan cantidad > 0
    const tallas = Object.values(tallasMap).filter((t) => t.cantidad > 0);
    console.log("Tallas finales a enviar:", tallas);

    return {
      name: contactData.nombre,
      email: contactData.correo,
      phone_number: parseInt(contactData.telefono.replace(/\D/g, "")),
      id_product: 1,
      design_file_url: design.design || "https://example.com/dummy.png",
      tela: design.fabricType || "Default",
      tallas: tallas,
      listado: players.map((p) => ({
        nombre: p.name || "",
        numero: p.number && p.number !== "" ? parseInt(p.number) : 0,
        talla:
          p.gender === "I" ? mapInfantilTallaToAdult(p.jersey) : p.jersey || "",
        cantidad: p.quantity || 0,
        genero: convertGenderToSpanish(p.gender),
      })),
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
    console.log("Tallas:", payload.tallas);
    console.log("Listado:", payload.listado);

    try {
      // Create FormData to send both JSON data and image file
      const formData = new FormData();

      // Add all payload fields
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone_number", payload.phone_number);
      formData.append("id_product", payload.id_product);
      formData.append("design_file_url", payload.design_file_url);
      formData.append("tela", payload.tela);
      formData.append("tallas", JSON.stringify(payload.tallas));
      formData.append("listado", JSON.stringify(payload.listado));

      // Fetch and add image files - supports frente, atrás, manga izquierda y derecha
      const imageFront = design.shirtImage || design.design;
      const imageBack = design.shirtImageBack;
      const imageLeftSleeve = design.shirtImageLeftSleeve;
      const imageRightSleeve = design.shirtImageRightSleeve;

      if (imageFront) {
        // Combinar las 4 imágenes en una sola
        const combinedImageBlob = await combineImagesIntoOne(
          imageFront,
          imageBack,
          imageLeftSleeve,
          imageRightSleeve,
        );
        formData.append("image", combinedImageBlob, "design_completo.png");
      } else {
        throw new Error("Se requiere un diseño de imagen");
      }

      const res = await fetch(
        "https://api-darklion.onrender.com/api/designs/client-and-design",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Status ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log("Respuesta API:", data);

      // Navegar a la página de envío de imágenes
      navigate("/enviar-imagenes", {
        state: {
          clientData: {
            name: payload.name,
            email: payload.email,
            phone_number: payload.phone_number,
          },
        },
      });
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
            className="sticky top-24 left-0 w-90 max-h-[calc(110vh-200px)] backdrop-blur rounded-2xl shadow-xl p-5 overflow-y-auto z-20 m-5"
          >
            <nav className="space-y-6">
              {/* CONFIGURACIÓN */}
              <h3 className="text-2xl font-bold text-center py-8 rounded-t-2xl bg-personalizado -mx-5 mb-8">
                MI UNIFORME PERSONALIZADO
              </h3>

              {/* JUGADORES */}
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

              <div>
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

              {/* COLORES */}
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
                    <strong>Manga Izquierda:</strong>{" "}
                    {design.colors?.manga_izquierda ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{
                          backgroundColor: design.colors.manga_izquierda,
                        }}
                        title={design.colors.manga_izquierda}
                      />
                    ) : (
                      "—"
                    )}
                  </li>

                  <li>
                    <strong>Manga Derecha:</strong>{" "}
                    {design.colors?.manga_derecha ? (
                      <span
                        className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
                        style={{ backgroundColor: design.colors.manga_derecha }}
                        title={design.colors.manga_derecha}
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

              {/* BOTONES */}
              <button
                onClick={handleEdit}
                className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Editar Uniforme
              </button>

              <button
                onClick={() => setShowContactForm(true)}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Enviar Uniforme
              </button>
            </nav>
          </aside>

          <main className="relative z-10 flex-1 flex flex-col items-center p-5">
            {/* Camisa personalizada 2D */}
            <section className="w-full flex flex-col items-center justify-center grow">
              <div className="h-100 flex items-center justify-center">
                <Shirt2D
                  colors={design.colors}
                  modelo={modelo}
                  shirtImage={design.shirtImage}
                  shirtImageBack={design.shirtImageBack}
                  shirtImageLeftSleeve={design.shirtImageLeftSleeve}
                  shirtImageRightSleeve={design.shirtImageRightSleeve}
                />
              </div>
            </section>

            {/* Botón para editar */}
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
          <main className="relative z-10 flex-1 flex flex-col items-center p-5">
            {/* Camisa personalizada 2D */}
            <section className="w-full flex flex-col items-center justify-center grow">
              <div className="h-100 flex items-center justify-center">
                <Shirt2D
                  colors={design.colors}
                  modelo={modelo}
                  shirtImage={design.shirtImage}
                  shirtImageBack={design.shirtImageBack}
                  shirtImageLeftSleeve={design.shirtImageLeftSleeve}
                  shirtImageRightSleeve={design.shirtImageRightSleeve}
                />
              </div>
            </section>
          </main>
        </>
      )}
    </section>
  );
}
