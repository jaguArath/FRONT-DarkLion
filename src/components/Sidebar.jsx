import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ChevronDownIcon,
  SwatchIcon,
  PhotoIcon,
  Square3Stack3DIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import design1 from "../assets/design/design1.png";
import design2 from "../assets/design/design2.png";

export default function Sidebar({
  colors,
  setColors,
  modelo: propModelo,
  shirtRef,
  visiblePlayerId,
  setVisiblePlayerId,
  setVisiblePlayer,
}) {
  const navigate = useNavigate();
  const { modelo } = useParams();
  const { state: locationState } = useLocation();
  const currentModelo = propModelo || modelo;

  // design state
  const [fabricType, setFabricType] = useState("");
  const [design, setDesign] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerNameField, setPlayerNameField] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [selectedField, setSelectedField] = useState(null); // 'team' | 'player' | null
  const [teamFont, setTeamFont] = useState("");
  const [playerFont, setPlayerFont] = useState("");

  // players state
  const [players, setPlayers] = useState([
    { id: 1, name: "Maduro", gender: "I", jersey: "2", number: 1, quantity: 1 },
    {
      id: 2,
      name: "Donald",
      gender: "H",
      jersey: "MD",
      number: 2,
      quantity: 2,
    },
    {
      id: 3,
      name: "Sheinbaum",
      gender: "M",
      jersey: "GD",
      number: 3,
      quantity: 3,
    },
    { id: 4, name: "Amlo", gender: "H", jersey: "XL", number: 21, quantity: 4 },
    {
      id: 5,
      name: "Fernando",
      gender: "I",
      jersey: "4",
      number: 10,
      quantity: 5,
    },
  ]);

  // Cargar datos si vienen del estado (al regresar desde SelectedData)
  useEffect(() => {
    if (locationState?.design) {
      const design = locationState.design;
      setFabricType(design.fabricType || "");
      setDesign(design.design || "");
      setColors(
        design.colors || { torso: "", back: "", sleeves: "", collar: "" },
      );
      setTeamName(design.teamName || "");
      setPlayerNameField(design.playerName || "");
      setLogoUrl(design.logoUrl || "");
      setTeamFont(design.teamFont || "");
      setPlayerFont(design.playerFont || "");
    }

    if (locationState?.players) {
      setPlayers(locationState.players);
    }
  }, [locationState]);

  const handleSave = async () => {
    // Capturar imágenes 3D (frente, atrás, manga izquierda y derecha)
    let shirtImage = null;
    let shirtImageBack = null;
    let shirtImageLeftSleeve = null;
    let shirtImageRightSleeve = null;
    
    if (shirtRef?.current?.captureImageBothSides) {
      try {
        const images = await shirtRef.current.captureImageBothSides();
        shirtImage = images.frente;
        shirtImageBack = images.atras;
        shirtImageLeftSleeve = images.mangaIzquierda;
        shirtImageRightSleeve = images.mangaDerecha;
      } catch (err) {
        console.error("Error capturando imágenes:", err);
        // Fallback a método antiguo si hay error
        if (shirtRef?.current?.captureImage) {
          shirtImage = shirtRef.current.captureImage();
        }
      }
    } else if (shirtRef?.current?.captureImage) {
      // Si el nuevo método no está disponible, usar el antiguo
      shirtImage = shirtRef.current.captureImage();
    }

    const designData = {
      fabricType,
      design,
      colors,
      teamName,
      playerName: playerNameField,
      logoUrl,
      teamFont,
      playerFont,
      shirtImage, // Vista frontal
      shirtImageBack, // Vista trasera
      shirtImageLeftSleeve, // Manga izquierda
      shirtImageRightSleeve, // Manga derecha
    };
    console.log("Jugadores que se envían desde Sidebar:", players);
    console.log("Jugadores infantiles:", players.filter(p => p.gender === "I"));
    navigate("/datos-seleccionados", {
      state: { design: designData, players, modelo: currentModelo },
    });
  };

  return (
    <aside
      className="
        sticky
        top-24
        left-15
        w-94
        max-h-[calc(100vh-200px)]
        backdrop-blur
        rounded-2xl
        shadow-xl
        p-5
        overflow-y-auto
        z-20
      "
    >
      <nav className="space-y-6 ">
        <Section title="Tipos de Tela">
          {["Microfibra", "Poliester", "Nylon", "Dry-Fit"].map((t) => (
            <OptionButton
              key={t}
              text={t}
              selected={fabricType === t}
              onClick={() => setFabricType(t)}
            />
          ))}
        </Section>

        <Section title="Diseños">
          <OptionButton
            text="Sin Diseño"
            selected={design === ""}
            onClick={() => setDesign("")}
          />
          {[design1, design2].map((src) => (
            <img
              key={src}
              src={src}
              alt="Diseño"
              className={`w-full rounded-lg cursor-pointer ${design === src ? "ring-2 ring-purple-500" : ""}`}
              onClick={() => setDesign(src)}
            />
          ))}
        </Section>

        <Section title="Cuerpo">
          <ColorPalette
            selected={colors.torso}
            onSelect={(c) => setColors((p) => ({ ...p, torso: c }))}
          />
        </Section>
        <Section title="Espalda">
          <ColorPalette
            selected={colors.back}
            onSelect={(c) => setColors((p) => ({ ...p, back: c }))}
          />
        </Section>

        <Section title="Mangas">
          <ColorPalette
            selected={colors.sleeves}
            onSelect={(c) => setColors((p) => ({ ...p, sleeves: c }))}
          />
        </Section>

        <Section title="Cuello">
          <ColorPalette
            selected={colors.collar}
            onSelect={(c) => setColors((p) => ({ ...p, collar: c }))}
          />
        </Section>
        
        <Section title="Logo">
          <LogoUploadLink onLogoSelect={setLogoUrl} />
        </Section>

        <Section title="Agregar Jugadores">
          <PlayersSection 
            players={players} 
            setPlayers={setPlayers}
            visiblePlayerId={visiblePlayerId}
            setVisiblePlayerId={setVisiblePlayerId}
            setVisiblePlayer={setVisiblePlayer}
          />
        </Section>

        {/* GUARDAR */}
        <button
          onClick={handleSave}
          style={{ fontFamily: "Montserrat1" }}
          className="w-full bg-personalizado py-3 rounded-lg text-lg shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer hover:shadow-md hover:bg-personalizado-click-hover"
        >
          Guardar Uniforme
        </button>
      </nav>
    </aside>
  );
}

// Titulos

function Section({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(true);
  const id = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <section>
      <header>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
          style={{ fontFamily: "Arboria" }}
          className="
            w-full
            flex
            justify-between
            items-center
            text-left
            transition
            bg-personalizado
            px-3 py-2
            rounded-lg
            cursor-pointer
          "
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-purple-700 " />}
            {title}
          </span>

          <ChevronDownIcon
            className={`
              w-5 h-5 transition-transform duration-200 
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>
      </header>

      {open && children && (
        <div id={id} className="mt-3 grid grid-cols-2 gap-2">
          {children}
        </div>
      )}
    </section>
  );
}

// TIPOS DE TELA

function OptionButton({ text, selected, onClick }) {
  const baseClasses = `cursor-pointer rounded-lg py-1.5 text-sm font-medium transition`;
  const colorClasses = selected
    ? "bg-personalizado-click-hover"
    : "bg-personalizado-click hover:bg-personalizado-click-hover";

  return (
    <button
      style={{ fontFamily: "Montserrat1" }}
      type="button"
      className={`${baseClasses} ${colorClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Color PALETA DAME PALETA

function ColorPalette({ selected, onSelect }) {
  const colors = [
    // Fila 1 - Grises y neutrales
    "rgb(255, 255, 255)",
    "rgb(200, 200, 200)",
    "rgb(150, 150, 150)",
    "rgb(120, 120, 120)",
    "rgb(80, 80, 80)",
    "rgb(40, 40, 40)",
    // Fila 2 - Rojos y vinos
    "rgb(220, 220, 220)",
    "rgb(139, 69, 69)",
    "rgb(178, 34, 34)",
    "rgb(220, 20, 60)",
    "rgb(250, 128, 114)",
    "rgb(255, 140, 105)",
    // Fila 3 - Naranjas y amarillos
    "rgb(200, 100, 50)",
    "rgb(255, 127, 80)",
    "rgb(255, 165, 0)",
    "rgb(255, 200, 0)",
    "rgb(240, 230, 150)",
    "rgb(255, 255, 0)",
    // Fila 4 - Verdes lima y verdes
    "rgb(200, 255, 50)",
    "rgb(173, 255, 47)",
    "rgb(152, 251, 152)",
    "rgb(34, 139, 34)",
    "rgb(0, 128, 128)",
    "rgb(72, 209, 204)",
    // Fila 5 - Azules y teals
    "rgb(30, 144, 255)",
    "rgb(135, 206, 235)",
    "rgb(25, 25, 112)",
    "rgb(0, 51, 102)",
    "rgb(25, 25, 112)",
    "rgb(70, 130, 180)",
    // Fila 6 - Púrpuras y pinks
    "rgb(75, 0, 130)",
    "rgb(138, 43, 226)",
    "rgb(186, 85, 211)",
    "rgb(216, 191, 216)",
    "rgb(255, 192, 203)",
    "rgb(219, 39, 119)",
  ];

  return (
    <div className="col-span-2 grid grid-cols-7 gap-2 w-fit mx-auto">
      {colors.map((color, index) => (
        <button
          key={index}
          title={color}
          style={{ backgroundColor: color }}
          onClick={() => onSelect && onSelect(color)}
          className={`
            w-8 h-8
            rounded
            border
            border-gray-300 
            hover:scale-140
            transition-transform
            duration-200
            cursor-pointer
            shadow-sm
            hover:shadow-md
            ${selected === color ? "ring-2 ring-purple-500" : ""}
          `}
        />
      ))}
    </div>
  );
}

// Text NOMBRE DE ...

function TextSection({
  value,
  onChange,
  placeholder = "Escribe aquí...",
  selected,
  onFocus,
  selectedFont,
  onFontSelect,
}) {
  const fonts = ["INTER", "ACTOR", "MONTSSERRAT", "JOMHURIA"];

  return (
    <div className="col-span-2 space-y-4 ">
      {/* Input de texto */}
      <div style={{ fontFamily: "Montserrat1" }}>
        <label className="block text-xs font-semibold text-gray-700 mb-2">
          Texto
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className={`
            w-full
            border-b-2
            border-gray-300
            bg-transparent
            px-2
            py-1
            text-sm
            focus:outline-none
            focus:border-purple-500
            placeholder-gray-400
            ${selected ? "ring-2 ring-purple-500" : ""}
          `}
        />
      </div>

      {/* Fuentes */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">
          Fuente
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((font) => {
            const isSel = selectedFont === font;
            const baseClasses = `rounded-lg py-2 px-3 text-xs font-medium transition text-gray-600 cursor-pointer`;
            const colorClasses = isSel
              ? "bg-personalizado-click-hover"
              : "bg-personalizado-click hover:bg-personalizado-click-hover";
            return (
              <button
                key={font}
                className={`${baseClasses} ${colorClasses}`}
                style={{ fontFamily: font.toLowerCase() }}
                onClick={() => onFontSelect && onFontSelect(font)}
              >
                {font}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Logoo

function LogoUploadLink({ onLogoSelect }) {
  const navigate = useNavigate();

  const handleOpenLogoWindow = () => {
    // Navega a la página de agregar logo en la misma ventana
    navigate("/agregar-logo");
  };

  return (
    <div className="col-span-2 flex flex-col items-center gap-3">
      <button
        onClick={handleOpenLogoWindow}
        className="
          w-full
          flex
          items-center
          justify-center
        bg-personalizado-click
        hover:bg-personalizado-click-hover
          rounded-lg
          py-10
          text-sm
          font-medium
          cursor-pointer
          transition
        "
      >
        <ArrowUpTrayIcon className="w-4 h-4 " />
        <p className="ml-2">UPLOAD</p>
      </button>
    </div>
  );
}

// Players Section

function PlayersSection({ players, setPlayers, visiblePlayerId, setVisiblePlayerId, setVisiblePlayer }) {
  // handlers are now passed from parent
  const [selectedId, setSelectedId] = useState(null);

  const handleAdd = () => {
    const newPlayer = {
      id: Date.now(),
      name: "",
      gender: "I",
      jersey: "2",
      number: 0,
      quantity: 1,
    };
    setPlayers([...players, newPlayer]);
  };

  const handleRemove = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
    if (visiblePlayerId === id) {
      setVisiblePlayerId(null);
      setVisiblePlayer(null);
    }
  };

  const handleChange = (id, field, value) => {
    // Validar campos requeridos
    if ((field === "gender" || field === "jersey") && value === "") {
      return; // No permitir valores vacíos
    }
    if (field === "quantity") {
      const quantityValue = parseInt(value) || 0;
      if (quantityValue < 1) {
        return; // No permitir cantidad menor a 1
      }
    }

    setPlayers(
      players.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };
          // Si se cambia el género, asignar automáticamente el primer jersey disponible
          if (field === "gender") {
            updated.jersey = value === "I" ? "2" : "XCH"; // Primer tamaño para cada género
          }
          // Actualizar visiblePlayer si es el jugador activo
          if (visiblePlayerId === id) {
            setVisiblePlayer(updated);
          }
          return updated;
        }
        return p;
      }),
    );
  };

  const handleToggleEye = (player) => {
    if (visiblePlayerId === player.id) {
      // Si está activado, desactivar
      setVisiblePlayerId(null);
      setVisiblePlayer(null);
    } else {
      // Si no está activado, activar este y desactivar los demás
      setVisiblePlayerId(player.id);
      setVisiblePlayer(player);
    }
  };

  return (
    <div className="col-span-2 space-y-6 relative">
      {players.map((player) => (
        <div
          key={player.id}
          className={`space-y-2 cursor-pointer ${selectedId === player.id ? "ring-2 ring-purple-500" : ""}`}
          onClick={() => setSelectedId(player.id)}
        >
          {/* FILA SUPERIOR */}
          <div className="flex items-end gap-2">
            {/* OJO */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleToggleEye(player);
              }}
              className={`p-2 rounded-lg shadow cursor-pointer transition-colors ${
                visiblePlayerId === player.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-personalizado-click'
              }`}
            >
              <EyeIcon className="w-5 h-5" />
            </button>

            {/* GEN */}
            <div title="Genero" className="flex flex-col text-xs">
              <span>Gen</span>
              <select
                value={player.gender}
                onChange={(e) =>
                  handleChange(player.id, "gender", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1 font-semibold"
                onClick={(e) => e.stopPropagation()}
                required
              >
                <option title="Infantil" value="I">
                  I
                </option>
                <option title="Hombre" value="H">
                  H
                </option>
                <option title="Mujer" value="M">
                  M
                </option>
              </select>
            </div>

            {/* JERSEY */}
            <div className="flex flex-col text-xs">
              <span>Jersey</span>
              <select
                value={player.jersey}
                onChange={(e) =>
                  handleChange(player.id, "jersey", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1 font-semibold"
                onClick={(e) => e.stopPropagation()}
                required
              >
                {player.gender === "I" ? (
                  <>
                    <option value="XCH">2</option>
                    <option value="CH">4</option>
                    <option value="MD">6</option>
                    <option value="GD">8</option>
                    <option value="XL">10</option>
                    <option value="XXL">12</option>
                    <option value="XXXL">14</option>
                    
                  </>
                ) : (
                  <>
                    <option value="XCH">XCH</option>
                    <option value="CH">CH</option>
                    <option value="MD">MD</option>
                    <option value="GD">GD</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </>
                )}
              </select>
            </div>

            {/* NUM */}
            <div title="Número del jugador" className="flex flex-col text-xs">
              <span>Num</span>
              <input
                type="number"
                value={player.number}
                onChange={(e) =>
                  handleChange(player.id, "number", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1 w-14"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* CANTI */}
            <div
              title="Cantidad de camisetas"
              className="flex flex-col text-xs"
            >
              <span>Canti *</span>
              <input
                type="number"
                value={player.quantity}
                onChange={(e) =>
                  handleChange(player.id, "quantity", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1 w-14 font-semibold"
                onClick={(e) => e.stopPropagation()}
                min="1"
                required
              />
            </div>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(player.id);
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg shadow cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* NOMBRE */}
          <input
            type="text"
            placeholder="Nombre del jugador"
            value={player.name}
            onChange={(e) => handleChange(player.id, "name", e.target.value)}
            className="w-full bg-purple-200 rounded-lg px-3 py-2 shadow"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ))}

      {/* BOTÓN + */}
      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white text-xl w-10 h-10 rounded-lg shadow-lg cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
