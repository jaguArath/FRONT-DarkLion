<article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
    <img src={TShirtIcon} className="w-8 h-8" />
  </div>

  <header className="md:text-right md:pr-19">
    <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1">
      <div className="flex items-center justify-end gap-2 mb-2">
        <h3 className="font-bold text-lg">Selecciona Modelo</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6D28D9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-hanger"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
        </svg>
      </div>
      <p
        style={{ fontFamily: "MontserratVariable" }}
        className="text-gray-600 text-sm mb-3"
      >
        Seleccione la maqueta de camiseta que mejor se adapte a tus necesidades
        de diseño para comenzar.
      </p>

      <span
        style={{ fontFamily: "MontserratVariable" }}
        className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
      >
        PASO 01
      </span>
    </section>
  </header>

  <figure className="flex justify-center">
    <img src={Personaliza} className="max-w-sm rounded-lg shadow-md" />
  </figure>
</article>;

{
  /* PASO 2 */
}
<article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
    <img src={DiagonalLinesIcons} className="w-8 h-8" />
  </div>

  <figure className="flex justify-center">
    <img src={Tela} className="max-w-sm rounded-lg shadow-md" />
  </figure>
  <header className="md:text-right md:pr-32">
    <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1 text-left md:text-left">
      <div className="flex items-center justify-end gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6D28D9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-ruler"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1" />
          <path d="M4 8l2 0" />
          <path d="M4 12l3 0" />
          <path d="M4 16l2 0" />
          <path d="M8 4l0 2" />
          <path d="M12 4l0 3" />
          <path d="M16 4l0 2" />
        </svg>
        <h3
          style={{ fontFamily: "MontserratVariable" }}
          className="font-bold text-lg mb-2 text-left md:text-left"
        >
          Tipo de Tela
        </h3>
      </div>
      <p
        style={{ fontFamily: "MontserratVariable" }}
        className="text-gray-600 text-sm mb-3 text-left"
      >
        Selecciona el material que garantice el máximo rendimiento y confort.
      </p>
      <span
        style={{ fontFamily: "MontserratVariable" }}
        className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
      >
        PASO 02
      </span>
    </section>
  </header>
</article>;

{
  /* PASO 4 */
}
<article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
    <img src={PencilDrawingIcons} className="w-8 h-8" />
  </div>
  <figure className="md:text-right flex gap-4 justify-center">
    <img src={Equipo} className="w-36 rounded shadow" />
    <img src={Jugador} className="w-36 rounded shadow" />
  </figure>

  <header className="md:text-right md:pr-19">
    <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6D28D9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      </svg>
      <h3 className="font-bold text-lg mb-2">Detalles del Jugador</h3>
      <p
        style={{ fontFamily: "MontserratVariable" }}
        className="text-gray-600 text-sm mb-3"
      >
        Añade nombre, número y patrocinadores.
      </p>

      <span
        style={{ fontFamily: "MontserratVariable" }}
        className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
      >
        PASO 04
      </span>
    </section>
  </header>
</article>;
