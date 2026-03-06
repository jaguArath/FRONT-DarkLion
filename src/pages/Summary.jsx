import React from "react";
import { useLocation } from "react-router-dom";

export default function Summary() {
  const { state } = useLocation();
  const design = state?.design || {};
  const players = state?.players || [];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resumen del Diseño</h1>

      <section className="space-y-4 mb-6">
        <h2 className="font-semibold">Datos de diseño</h2>
        <ul className="list-disc pl-6">
          <li>Tela: {design.fabricType || "—"}</li>
          <li>
            Diseño: {design.design ? <img src={design.design} alt="design" className="inline-block w-12 h-12" /> : "—"}
          </li>
          <li>Colores:</li>
          <ul className="list-disc pl-6">
            <li>Cuerpo: {design.colors?.torso || "—"}</li>
            <li>Espalda: {design.colors?.back || "—"}</li>
            <li>Mangas: {design.colors?.sleeves || "—"}</li>
            <li>Cuello: {design.colors?.collar || "—"}</li>
          </ul>
          <li>Nombre equipo: {design.teamName || "—"}</li>
          <li>Fuente equipo: {design.teamFont || "—"}</li>
          <li>Nombre jugador (campo): {design.playerName || "—"}</li>
          <li>Fuente jugador: {design.playerFont || "—"}</li>
          <li>
            Logo: {design.logoUrl ? <img src={design.logoUrl} alt="logo" className="inline-block w-12 h-12" /> : "—"}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Jugadores añadidos</h2>
        {players.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Nombre</th>
                <th className="border px-2 py-1">Género</th>
                <th className="border px-2 py-1">Jersey</th>
                <th className="border px-2 py-1">Número</th>
                <th className="border px-2 py-1">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={p.id || i}>
                  <td className="border px-2 py-1">{i + 1}</td>
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.gender}</td>
                  <td className="border px-2 py-1">{p.jersey}</td>
                  <td className="border px-2 py-1">{p.number}</td>
                  <td className="border px-2 py-1">{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se agregaron jugadores.</p>
        )}
      </section>
    </main>
  );
}
