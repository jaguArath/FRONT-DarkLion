import React from "react";
import { NavLink } from "react-router-dom";

import LogoDark from "./../assets/LogoDark.png";

import Fondo from "./../assets/Fondo.png";

import CuelloVImg from "./../assets/shirts/CuelloVImg.png";
import Redondo from "./../assets/shirts/Redondo.png";
import Camisola from "./../assets/shirts/Camisola.png";
import TankTop from "./../assets/shirts/TankTop.png";

import MarcaAgua from "./../assets/MarcaAgua.png";

import Contacto from "./../assets/home/Contacto.png";
import CuelloPaleta from "./../assets/home/CuelloPaleta.png";
import Equipo from "./../assets/home/Equipo.png";
import Jugador from "./../assets/home/Jugador.png";
import Mangas from "./../assets/home/Mangas.png";
import Personaliza from "./../assets/home/Personaliza.png";
import Tela from "./../assets/home/Tela.png";

import ApprovalIcons from "./../assets/icons/ApprovalIcons.png";
import DiagonalLinesIcons from "./../assets/icons/DiagonalLinesIcons.png";
import JerseyNumberIcons from "./../assets/icons/JerseyNumberIcons.png";
import OrderCompletedIcons from "./../assets/icons/OrderCompletedIcons.png";
import PencilDrawingIcons from "./../assets/icons/PencilDrawingIcons.png";
import TShirtIcon from "./../assets/icons/TShirtIcon.png";

export default function Home() {
  const shirts = [
    { id: 1, name: "CUELLO V", image: CuelloVImg, link: "/cuello-v" },
    { id: 2, name: "REDONDO", image: Redondo, link: "/cuello-redondo" },
    { id: 3, name: "CAMISOLA", image: Camisola, link: "/cuello-camisola" },
    { id: 4, name: "TANK TOP", image: TankTop, link: "/cuello-tank-top" },
  ];

  const icons = [
    { id: 5, name: "ApprovalIcons", image: ApprovalIcons },
    { id: 6, name: "DiagonalLinesIcons", image: DiagonalLinesIcons },
    { id: 7, name: "JerseyNumberIcons", image: JerseyNumberIcons },
    { id: 8, name: "OrderCompletedIcons", image: OrderCompletedIcons },
    { id: 9, name: "PencilDrawingIcons", image: PencilDrawingIcons },
    { id: 10, name: "TShirtIcon", image: TShirtIcon },
  ];

  return (
    <main id="home">
      <section
        className="min-h-screen px-6 py-8 pt-7 text-white bg-cover bg-top relative"
        style={{ backgroundImage: `url(${Fondo})` }}
      >
        {/* <div className="absolute inset-0 bg-black/40"></div> */}
        {/* <div className="relative z-10"> */}

        <h1
          style={{ fontFamily: "Chakra, sans-serif" }}
          className="mb-10 text-center text-xl md:text-2xl lg:text-5xl font-extrabold uppercase tracking-widest text-white drop-shadow-xl "
          // className="mb-10 text-center text-4xl font-extrabold tracking-wide"
        >
          PERSONALIZA TU PRENDA
        </h1>

        <div className="mx-auto grid max-w-6xl place-items-center grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {shirts.map((shirt) => (
            <div
              key={shirt.id}
              className="relative rounded-xl bg-white w-55 p-6 text-center transition-all duration-300 overflow-hidden shadow-lg"
            >
              {/* Marca de agua */}
              <img
                src={MarcaAgua}
                alt="Marca de agua"
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
              />

              {/* Nombree */}
              <p
                style={{ fontFamily: "Arboria, sans-serif" }}
                className="relative z-10 font-semibold mb-2 text-black "
              >
                {shirt.name}
              </p>

              {/* Camisa */}
              <img
                src={shirt.image}
                alt={shirt.name}
                className="relative z-20 mx-auto h-55 object-contain drop-shadow-lg"
              />

              {/* Boton */}
              <NavLink
                to={shirt.link}
                // target="_blank"
                // rel="nooper noreferrer"
                className="inline-block text-white relative cursor-pointer rounded-md border-2 border-morado-claro bg-morado-claro px-5 py-2 mt-4 text-sm font-semibold transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:border-purple-600 hover:text-white shadow-sm"
              >
                Personalizar
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <section className="py-15 px-6 bg-white">
        {/* TÍTULO */}
        <header className="text-center mb-20">
          <h1
            style={{ fontFamily: "Chakra, sans-serif" }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-normal"
          >
            TU CAMINO AL <span className="text-morado-exito">ÉXITO</span>
          </h1>

          <p
            style={{ fontFamily: "MontserratVariable" }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl font-light leading-snug"
          >
            Sigue nuestra hoja de ruta interactiva para diseñar <br /> tus
            uniformes personalizados.
          </p>

          {/* <div className="w-30 h-2.5 bg-morado-exito mx-auto mt-8 rounded-full"></div> */}
          <div className="flex justify-center">
            <div className="w-25 h-2 bg-morado-exito mt-14 rounded-full"></div>
          </div>
        </header>

        <section className="relative max-w-6xl mx-auto">
          {/* Línea central */}
          <span className="absolute left-1/2 top-0 h-[83%] w-1 bg-semi-blanquito -translate-x-1/2 z-0"></span>

          {/* PASO 1 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={TShirtIcon} className="w-8 h-8" />
            </div>

            <header className="md:text-right md:pr-19">
              {/* <section className="bg-white p-6 rounded-xl inline-block max-w-md w-[334px] h-[184px] border-2 border-gray-gray border:opacity-50 hover:shadow-[0_10px_20px_-8px_rgba(0,0,0,1)] hover:scale-102 hover:border-gray-gray"> */}
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
                  className=" text-sm mb-3"
                >
                  Seleccione la maqueta de camiseta que mejor se adapte a tus
                  necesidades de diseño para comenzar.
                </p>

                <span
                  style={{ fontFamily: "MontserratVariable" }}
                  className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                >
                  PASO 01
                </span>
                {/* <span className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border border-morado-exito rounded-full bg-white">  PASO 01</span> */}
              </section>
            </header>

            <figure className="flex justify-center">
              <img
                src={Personaliza}
                className="max-w-sm rounded-lg shadow-md"
              />
            </figure>
          </article>

          {/* PASO 2 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
              <img src={DiagonalLinesIcons} className="w-8 h-8" />
            </div>

            <figure className="flex justify-center">
              <img src={Tela} className="max-w-sm rounded-lg shadow-md" />
            </figure>
            <header className="md:text-right md:pr-32">
              {/* <section className="bg-white p-6 rounded-xl shadow-lg inline-block max-w-md hover:scale-102"> */}
              <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1 text-left md:text-left">
                <div className="flex items-center gap-2 mb-2">
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
                  className="text-sm mb-3 text-left"
                >
                  Selecciona el material que garantice el máximo rendimiento y
                  confort.
                </p>
                <span
                  style={{ fontFamily: "MontserratVariable" }}
                  className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                >
                  PASO 02
                </span>
              </section>
            </header>
          </article>

          {/* PASO 3 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={PencilDrawingIcons} className="w-8 h-8" />
            </div>

            <header className="md:text-right md:pr-19">
              <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <h3 className="font-bold text-lg">Personalización Visual</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#6D28D9"
                    class="icon icon-tabler icons-tabler-filled icon-tabler-palette"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2c5.498 0 10 4.002 10 9c0 1.351 -.6 2.64 -1.654 3.576c-1.03 .914 -2.412 1.424 -3.846 1.424h-2.516a1 1 0 0 0 -.5 1.875a1 1 0 0 1 .194 .14a2.3 2.3 0 0 1 -1.597 3.99l-.156 -.009l.068 .004l-.273 -.004c-5.3 -.146 -9.57 -4.416 -9.716 -9.716l-.004 -.28c0 -5.523 4.477 -10 10 -10m-3.5 6.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m8 0a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m-4 -3a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
                  </svg>
                </div>
                <p
                  style={{ fontFamily: "MontserratVariable" }}
                  className="text-sm mb-3"
                >
                  Aplica los colores de tu equipo. Elige combinaciones para
                  cuerpo, mangas y cuello.
                </p>

                <span
                  style={{ fontFamily: "MontserratVariable" }}
                  className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                >
                  PASO 03
                </span>
              </section>
            </header>

            <figure className="flex justify-center gap-4">
              <img src={Mangas} className="w-40 rounded shadow" />
              <img src={CuelloPaleta} className="w-40 rounded shadow" />
            </figure>
          </article>


          {/* PASO 4 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
              <img src={JerseyNumberIcons} className="w-8 h-8" />
            </div>
            <figure className="md:text-right flex gap-4 justify-center">
              <img src={Equipo} className="w-36 rounded shadow" />
              <img src={Jugador} className="w-36 rounded shadow" />
            </figure>

            <header className="md:text-right md:pr-32">
              <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1 text-left md:text-left">
                <div className="flex items-center gap-2 mb-2">
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
                  <h3 className="font-bold text-lg">Detalles del Jugador</h3>
                  
                </div>
                <p
                  style={{ fontFamily: "MontserratVariable" }}
                  className=" text-sm mb-3"
                >
                  Añade nombre, número y elige la tipografía. Sube el logo de tu equipo y patrocinadores.
                </p>

                <span
                  style={{ fontFamily: "MontserratVariable" }}
                  className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                >
                  PASO 04
                </span>
              </section>
            </header>

            
          </article>

          {/* PASO 5 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={OrderCompletedIcons} className="w-8 h-8" />
            </div>

            <header className="md:text-right md:pr-19">
              <section className=" bg-white p-6 inline-block w-[335px] h-[184px] border-2 border-[rgba(129,128,128,0.54)] rounded-[30px] transition-all duration-300 hover:shadow-[0_4px_4px_rgba(0.22,0.1,0.1,0.40)] hover:-translate-y-1">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <h3 className="font-bold text-lg">Resumen y Contacto</h3>
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-id"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -10" />
                    <path d="M7 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M15 8l2 0" />
                    <path d="M15 12l2 0" />
                    <path d="M7 16l10 0" />
                  </svg>
                </div>
                <p
                  style={{ fontFamily: "MontserratVariable" }}
                  className=" text-sm mb-3"
                >
                  Revisa tu pedido, agrega cantidades por talla y envíanos tus
                  datos para procesar la orden
                </p>

                <span
                  style={{ fontFamily: "MontserratVariable" }}
                  className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                >
                  PASO 05
                </span>
              </section>
            </header>

            <figure className="flex justify-center">
              <img
                src={Contacto}
                className="max-w-sm rounded-lg shadow-md"
              />
            </figure>
          </article>



          {/* FINAL */}
          <article className="text-center relative mb-32 ">
            <div className="absolute left-1/2 -top-20 -translate-x-1/2 z-20 border-4 border-morado-exito bg-morado-exito p-3 rounded-full shadow-lg">
              <img src={ApprovalIcons} className="w-10 h-10" />
            </div>

            <section className="bg-white p-10 rounded-xl shadow-xl max-w-md mx-auto">
              <h3
                style={{ fontFamily: "Chakra9" }}
                className="text-2xl font-bold mb-4"
              >
                ¡LISTO!
              </h3>

              <p style={{ fontFamily: "MontserratVariable" }} className="mb-6">
                Tu diseño está completo. Nuestro equipo te contactará en breve
                para confirmar detalles y comenzar la producción.
              </p>
              <figure className="">
                <img src={LogoDark} className="mx-auto w-32 mb-6" />
              </figure>

              <a
                href="#home"
                className="inline-block bg-morado-exito text-white px-6 py-3 rounded-full font-semibold hover:bg-morado-claro transition"
              >
                CREAR MI DISEÑO
              </a>
            </section>
          </article>
        </section>
      </section>
    </main>
  );
}
