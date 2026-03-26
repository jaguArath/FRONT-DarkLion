import React from "react";
import PropTypes from "prop-types";
import ColorSwatch from "./ColorSwatch";

/**
 * Sidebar that shows current design configuration and player list.
 */
export default function SelectedDataSidebar({
  design,
  players,
  onEdit,
  onSend,
}) {
  const renderPlayers = () => {
    if (!players || players.length === 0) {
      return <p className="text-xs">Sin jugadores</p>;
    }
    return (
      <div className="space-y-2 text-xs">
        {players.map((p, i) => (
          <div key={p.id || i} className="bg-purple-100 p-2 rounded">
            <p>
              <strong>{p.name || `Jugador ${i + 1}`}</strong>
            </p>
            <p>
              Género: {p.gender || "—"} | Jersey: {p.jersey || "—"} | Nº{" "}
              {p.number || "—"}
            </p>
            <p>Cant: {p.quantity || 0}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside
      aria-label="Panel de datos seleccionados"
      className="
            sticky
            top-24
            left-0
            w-90
            max-h-[calc(100vh-200px)]
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
          <h3 className="font-bold text-lg mb-3">Configuración</h3>
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
              <strong>Color nombre:</strong>{" "}
              <ColorSwatch color={design.nameColor} />
            </li>
            <li>
              <strong>Fuente nombre:</strong> {design.nameFont || "—"}
            </li>
            <li>
              <strong>Color número:</strong>{" "}
              <ColorSwatch color={design.numberColor} />
            </li>
            <li>
              <strong>Fuente número:</strong> {design.numberFont || "—"}
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
              <ColorSwatch color={design.colors?.torso} />
            </li>
            <li>
              <strong>Espalda:</strong>{" "}
              <ColorSwatch color={design.colors?.back} />
            </li>
            <li>
              <strong>Manga Izquierda:</strong>{" "}
              <ColorSwatch color={design.colors?.manga_izquierda} />
            </li>
            <li>
              <strong>Manga Derecha:</strong>{" "}
              <ColorSwatch color={design.colors?.manga_derecha} />
            </li>
            <li>
              <strong>Cuello:</strong>{" "}
              <ColorSwatch color={design.colors?.collar} />
            </li>
          </ul>
        </div>

        {/* Jugadores */}
        <div>
          <h3 className="font-bold text-lg mb-3">Jugadores</h3>
          {renderPlayers()}
        </div>

        {/* Botones */}
        <button
          onClick={onEdit}
          className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Editar Uniforme
        </button>

        <button
          onClick={onSend}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          Enviar Uniforme
        </button>
      </nav>
    </aside>
  );
}

SelectedDataSidebar.propTypes = {
  design: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};
