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

export default function Sidebar() {
  const navigate = useNavigate();
  const { modelo } = useParams();
  const { state: locationState } = useLocation();

  // design state
  const [fabricType, setFabricType] = useState("");
  const [design, setDesign] = useState("");
  const [colors, setColors] = useState({ torso: "", back: "", sleeves: "", collar: "" });
  const [teamName, setTeamName] = useState("");
  const [playerNameField, setPlayerNameField] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [selectedField, setSelectedField] = useState(null); // 'team' | 'player' | null
  const [teamFont, setTeamFont] = useState("");
  const [playerFont, setPlayerFont] = useState("");

  // players state
  const [players, setPlayers] = useState([
    { id: 1, name: "Arath B.", gender: "H", jersey: "L", number: 21, quantity: 21 },
  ]);

  // Cargar datos si vienen del estado (al regresar desde SelectedData)
  useEffect(() => {
    if (locationState?.design) {
      const design = locationState.design;
      setFabricType(design.fabricType || "");
      setDesign(design.design || "");
      setColors(design.colors || { torso: "", back: "", sleeves: "", collar: "" });
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

  const handleSave = () => {
    const designData = { fabricType, design, colors, teamName, playerName: playerNameField, logoUrl, teamFont, playerFont };
    navigate("/datos-seleccionados", { state: { design: designData, players, modelo } });
  };

  return (
    <aside
      aria-label="Panel de personalización"
      className="
        sticky
        top-24
        left-17
        w-90
        max-h-[calc(100vh-200px)]
        backdrop-blur
        rounded-2xl
        shadow-xl
        p-5
        overflow-y-auto
        z-20
      "
    >
      <nav className="space-y-6">
        <Section title="Tipos de Tela" icon={SwatchIcon}>
          {['Microfibra','Poliester','Nylon','Dry-Fit'].map((t) => (
            <OptionButton
              key={t}
              text={t}
              selected={fabricType === t}
              onClick={() => setFabricType(t)}
            />
          ))}
        </Section>

        <Section title="Diseños" icon={PhotoIcon}>
          {["/shirt1.png", "/shirt2.png"].map((src) => (
            <img
              key={src}
              src={src}
              alt="Diseño"
              className={`w-full rounded-lg cursor-pointer ${design === src ? "ring-2 ring-purple-500" : ""}`}
              onClick={() => setDesign(src)}
            />
          ))}
        </Section>

        <Section title="Cuerpo" icon={Square3Stack3DIcon}>
          <ColorPalette
            selected={colors.torso}
            onSelect={(c) => setColors((p) => ({ ...p, torso: c }))}
          />
        </Section>
        <Section title="Espalda" icon={ArrowUpTrayIcon}>
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
        <Section title="Nombre del Equipo">
          <TextSection
            value={teamName}
            onChange={setTeamName}
            placeholder="Equipo..."
            selected={selectedField === 'team'}
            onFocus={() => setSelectedField('team')}
            selectedFont={teamFont}
            onFontSelect={setTeamFont}
          />
        </Section>
        <Section title="Nombre del Jugador">
          <TextSection
            value={playerNameField}
            onChange={setPlayerNameField}
            placeholder="Jugador..."
            selected={selectedField === 'player'}
            onFocus={() => setSelectedField('player')}
            selectedFont={playerFont}
            onFontSelect={setPlayerFont}
          />
        </Section>
        <Section title="Logo">
          <LogoUploadLink onLogoSelect={setLogoUrl} />
        </Section>

        <Section title="Agregar Jugadores">
          <PlayersSection players={players} setPlayers={setPlayers} />
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
          "
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-purple-700" />}
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
  const baseClasses = `rounded-lg py-1.5 text-sm font-medium transition`;
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

function TextSection({ value, onChange, placeholder = "Escribe aquí...", selected, onFocus, selectedFont, onFontSelect }) {
  const fonts = ["INTER", "ACTOR", "MONTSSERRAT", "JOMHURIA"];

  return (
    <div className="col-span-2 space-y-4">
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
            const baseClasses = `rounded-lg py-2 px-3 text-xs font-medium transition text-gray-600`;
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

function PlayersSection({ players, setPlayers }) {
  // handlers are now passed from parent
  const [selectedId, setSelectedId] = useState(null);

  const handleAdd = () => {
    const newPlayer = {
      id: Date.now(),
      name: "",
      gender: "",
      jersey: "",
      number: "",
      quantity: 1,
    };
    setPlayers([...players, newPlayer]);
  };

  const handleRemove = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleChange = (id, field, value) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
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
            <button className="bg-personalizado-click p-2 rounded-lg shadow">
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
                className="bg-purple-200 rounded-lg px-2 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">-</option>
                <option title="Hombre" value="H">H</option>
                <option title="Mujer" value="M">M</option>
                <option title="Niño" value="Ñ">Ñ</option>
              </select>
            </div>

            {/* JERSEY */}
            <div  className="flex flex-col text-xs">
              <span>Jersey</span>
              <select
                value={player.jersey}
                onChange={(e) =>
                  handleChange(player.id, "jersey", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">-</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
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
            <div title="Cantidad de camisetas" className="flex flex-col text-xs">
              <span>Canti</span>
              <input
                type="number"
                value={player.quantity}
                onChange={(e) =>
                  handleChange(player.id, "quantity", e.target.value)
                }
                className="bg-purple-200 rounded-lg px-2 py-1 w-14"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(player.id);
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg shadow"
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
          className="bg-green-600 text-white text-xl w-10 h-10 rounded-lg shadow-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
