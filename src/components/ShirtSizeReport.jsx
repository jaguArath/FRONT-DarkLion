import React from "react";
import * as XLSX from "xlsx";

export default function ShirtSizeReport({ payload }) {
  const TIPOS = ["DAMA", "CABALLERO", "INFANTIL"];
  const TALLAS_ADULTO = ["XCH", "CH", "MD", "GD", "XL", "XXL", "XXXL"];
  const TALLAS_INFANTIL = ["2", "4", "6", "8", "10", "12", "14", "16"];

  // Función para obtener tallas según tipo
  const getTallasByTipo = (tipo) => {
    return tipo === "INFANTIL" ? TALLAS_INFANTIL : TALLAS_ADULTO;
  };

  // Crear matriz de datos
  const createMatrix = () => {
    const matrix = {};

    TIPOS.forEach((tipo) => {
      matrix[tipo] = {};
      const tallas = getTallasByTipo(tipo);
      tallas.forEach((talla) => {
        matrix[tipo][talla] = 0;
      });
    });

    // Llenar con datos reales
    payload.tallas.forEach(({ tipo, talla, cantidad }) => {
      if (matrix[tipo] && matrix[tipo].hasOwnProperty(talla)) {
        matrix[tipo][talla] = cantidad;
      }
    });

    return matrix;
  };

  const matrix = createMatrix();

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Datos para el Excel - Usar tallas específicas por tipo
    const dataForExcel = [
      ["PLAYERAS/CAMISOLA", ...TALLAS_ADULTO],
      ["DAMA", ...TALLAS_ADULTO.map((talla) => matrix.DAMA[talla] || "")],
      [
        "CABALLERO",
        ...TALLAS_ADULTO.map((talla) => matrix.CABALLERO[talla] || ""),
      ],
      [],
      ["PLAYERAS/CAMISOLA (INFANTIL)", ...TALLAS_INFANTIL],
      [
        "INFANTIL",
        ...TALLAS_INFANTIL.map((talla) => matrix.INFANTIL[talla] || ""),
      ],
      [],
      ["INFORMACIÓN DE CONTACTO"],
      ["Nombre", payload.name],
      ["Email", payload.email],
      ["Teléfono", payload.phone_number],
      ["Tela", payload.tela],
    ];

    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

    // Ajustar ancho de columnas
    ws["!cols"] = [
      { wch: 20 },
      ...Array(Math.max(TALLAS_ADULTO.length, TALLAS_INFANTIL.length)).fill({
        wch: 12,
      }),
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, `uniforme-${payload.name}-${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Resumen de Camisas a Fabricar
      </h2>

      {/* Tabla de Tallas Adulto */}
      <div className="overflow-x-auto mb-8">
        <h3 className="text-xl font-bold mb-4">Tallas Adulto</h3>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-400 px-4 py-3 font-bold text-left">
                PLAYERAS/CAMISOLA
              </th>
              {TALLAS_ADULTO.map((talla) => (
                <th
                  key={talla}
                  className="border border-gray-400 px-4 py-3 font-bold text-center"
                >
                  {talla}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["DAMA", "CABALLERO"].map((tipo) => (
              <tr key={tipo} className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 font-bold bg-gray-100">
                  {tipo}
                </td>
                {TALLAS_ADULTO.map((talla) => {
                  const cantidad = matrix[tipo][talla];
                  return (
                    <td
                      key={`${tipo}-${talla}`}
                      className="border border-gray-400 px-4 py-3 text-center"
                    >
                      {cantidad > 0 ? (
                        <span className="font-bold text-lg text-blue-600">
                          {cantidad}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de Tallas Infantil */}
      <div className="overflow-x-auto mb-8">
        <h3 className="text-xl font-bold mb-4">Tallas Infantil</h3>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-400 px-4 py-3 font-bold text-left">
                PLAYERAS/CAMISOLA
              </th>
              {TALLAS_INFANTIL.map((talla) => (
                <th
                  key={talla}
                  className="border border-gray-400 px-4 py-3 font-bold text-center"
                >
                  {talla}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-400 px-4 py-3 font-bold bg-gray-100">
                INFANTIL
              </td>
              {TALLAS_INFANTIL.map((talla) => {
                const cantidad = matrix["INFANTIL"][talla];
                return (
                  <td
                    key={`INFANTIL-${talla}`}
                    className="border border-gray-400 px-4 py-3 text-center"
                  >
                    {cantidad > 0 ? (
                      <span className="font-bold text-lg text-blue-600">
                        {cantidad}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Información de Contacto */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Información Registrada</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Nombre</p>
            <p className="font-semibold">{payload.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="font-semibold">{payload.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Teléfono</p>
            <p className="font-semibold">{payload.phone_number}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Tela</p>
            <p className="font-semibold">{payload.tela}</p>
          </div>
        </div>
      </div>

      {/* Listado de Jugadores */}
      {payload.listado && payload.listado.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-xl font-bold mb-4">Jugadores Registrados</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border border-blue-300 px-3 py-2 text-left">
                    #
                  </th>
                  <th className="border border-blue-300 px-3 py-2 text-left">
                    Nombre
                  </th>
                  <th className="border border-blue-300 px-3 py-2 text-center">
                    Número
                  </th>
                  <th className="border border-blue-300 px-3 py-2 text-center">
                    Talla
                  </th>
                  <th className="border border-blue-300 px-3 py-2 text-center">
                    Género
                  </th>
                  <th className="border border-blue-300 px-3 py-2 text-center">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload.listado.map((jugador, idx) => (
                  <tr key={idx} className="hover:bg-blue-100">
                    <td className="border border-blue-300 px-3 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-blue-300 px-3 py-2">
                      {jugador.nombre}
                    </td>
                    <td className="border border-blue-300 px-3 py-2 text-center">
                      {jugador.numero || "-"}
                    </td>
                    <td className="border border-blue-300 px-3 py-2 text-center">
                      {jugador.talla}
                    </td>
                    <td className="border border-blue-300 px-3 py-2 text-center">
                      {jugador.genero}
                    </td>
                    <td className="border border-blue-300 px-3 py-2 text-center font-semibold">
                      {jugador.cantidad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={exportToExcel}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          📥 Descargar Excel
        </button>
      </div>
    </div>
  );
}
