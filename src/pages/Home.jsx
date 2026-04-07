import React from "react";
import { NavLink } from "react-router-dom";
import { CardTilt, CardTiltContent } from "@/components/ui/card-tilt";
import {
  LayerStack,
  Card as LayerStackCard,
} from "@/components/ui/layer-stack";
import {
  BorderGlide,
  BorderGlideCard,
  BorderGlideContent,
} from "@/components/ui/border-glide";

// Logos y fondos
import LogoDark from "./../assets/LogoDark.png";
import Fondo from "./../assets/Fondo.png";
import MarcaAgua from "./../assets/MarcaAgua.png";

// Shirts
import CuelloVImg from "./../assets/shirts/CuelloVImg.png";
import Redondo from "./../assets/shirts/Redondo.png";
import Camisola from "./../assets/shirts/Camisola.png";
import TankTop from "./../assets/shirts/TankTop.png";

// Home images
import Contacto from "./../assets/home/Contacto.png";
import CuelloPaleta from "./../assets/home/CuelloPaleta.png";
import Equipo from "./../assets/home/Equipo.png";
import Jugador from "./../assets/home/Jugador.png";
import Mangas from "./../assets/home/Mangas.png";
import Personaliza from "./../assets/home/Personaliza.png";
import Tela from "./../assets/home/Tela.png";

// Icons
import ApprovalIcons from "./../assets/icons/ApprovalIcons.png";
import DiagonalLinesIcons from "./../assets/icons/DiagonalLinesIcons.png";
import JerseyNumberIcons from "./../assets/icons/JerseyNumberIcons.png";
import OrderCompletedIcons from "./../assets/icons/OrderCompletedIcons.png";
import PencilDrawingIcons from "./../assets/icons/PencilDrawingIcons.png";
import TShirtIcon from "./../assets/icons/TShirtIcon.png";

// Data constants
const shirts = [
  {
    id: 1,
    name: "CAMISA CUELLO V",
    image: CuelloVImg,
    link: "/personalizar/cuello-v",
  },
  {
    id: 2,
    name: "CUELLO REDONDO",
    image: Redondo,
    link: "/personalizar/cuello-redondo",
  },
  {
    id: 3,
    name: "CAMISOLA",
    image: Camisola,
    link: "/personalizar/cuello-camisola",
  },
  {
    id: 4,
    name: "TANK TOP",
    image: TankTop,
    link: "/personalizar/cuello-tank-top",
  },
];

const icons = [
  { id: 5, name: "ApprovalIcons", image: ApprovalIcons },
  { id: 6, name: "DiagonalLinesIcons", image: DiagonalLinesIcons },
  { id: 7, name: "JerseyNumberIcons", image: JerseyNumberIcons },
  { id: 8, name: "OrderCompletedIcons", image: OrderCompletedIcons },
  { id: 9, name: "PencilDrawingIcons", image: PencilDrawingIcons },
  { id: 10, name: "TShirtIcon", image: TShirtIcon },
];

const steps = [
  {
    id: 1,
    paso: "PASO 01",
    title: "Elige el tipo de prenda",
    description:
      "Seleccione la maqueta del modelo de prenda que deseas adquirir.",
    image: Personaliza,
    icon: TShirtIcon,
  },
  {
    id: 2,
    paso: "PASO 02",
    title: "Tipo de Tela",
    description: "Elige una opción de nuestras telas con tecnología dri-fit.",
    image: Tela,
    icon: DiagonalLinesIcons,
  },
  {
    id: 3,
    paso: "PASO 03",
    title: "Crea tu diseño - previsualización",
    description:
      "Aplica los colores de tu equipo y crea combinaciones para cuerpo, mangas y cuello. Elige la tipografía para el nombre de tu equipo o carga la imagen de tu logo.",
    image: Mangas,
    icon: PencilDrawingIcons,
  },
  {
    id: 4,
    paso: "PASO 04",
    title: "Detalles del Jugador",
    description: "Añade nombre, número y elige la tipografía.",
    image: Equipo,
    icon: JerseyNumberIcons,
  },
  {
    id: 5,
    paso: "PASO 05",
    title: "Realiza tu orden",
    description:
      "Revisa tu diseño, agrega cantidad, talla, nombre y número de jugador. No olvides tus datos personales para contactarte al procesar la orden.",
    image: Contacto,
    icon: OrderCompletedIcons,
  },
];

export default function Home() {
  return (
    <main id="home">
      <section
        className="min-h-screen px-6 py-8 pt-7 text-white bg-cover bg-top relative"
        style={{ backgroundImage: `url(${Fondo})` }}
      >
        <h1
          style={{ fontFamily: "Chakra" }}
          className="mb-10 text-center text-xl md:text-2xl lg:text-5xl font-extrabold uppercase tracking-widest text-white drop-shadow-xl "
        >
          PERSONALIZA TU PRENDA
        </h1>

        {/* LayerStack para móviles */}
        <div className="mx-auto max-w-6xl flex justify-center lg:hidden">
          <LayerStack
            cardWidth={300}
            cardGap={14}
            stageHeight={420}
            lastCardFullWidth={true}
            mobileSensitivity={1}
          >
            {shirts.map((shirt, index) => {
              const isLast = index === shirts.length - 1;

              if (isLast) {
                return (
                  <LayerStackCard
                    key={shirt.id}
                    className="bg-white text-black border border-gray-200 overflow-hidden rounded-xl"
                  >
                    <div className="flex h-full flex-col md:flex-row">
                      <div className="relative md:w-1/2 h-48 md:h-full overflow-hidden">
                        <img
                          src={shirt.image}
                          alt={shirt.name}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-contain p-4"
                          style={{
                            contentVisibility: "auto",
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </div>

                      <div className="flex md:w-1/2 flex-col justify-between p-6 gap-4">
                        <div className="flex items-center justify-between">
                          <span
                            style={{ fontFamily: "Montserrat" }}
                            className="text-xs font-bold tracking-widest uppercase text-morado-exito"
                          >
                            {shirt.name.split(" ")[0]}
                          </span>
                          <div className="size-1.5 rounded-full bg-morado-exito/30" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-px w-8 bg-morado-exito" />
                          <h2
                            style={{ fontFamily: "Chakra" }}
                            className="text-lg font-bold tracking-tight leading-tight"
                          >
                            {shirt.name}
                          </h2>
                          <p
                            style={{ fontFamily: "Montserrat1" }}
                            className="text-sm leading-relaxed text-gray-600"
                          >
                            Diseña y personaliza esta prenda con los colores de
                            tu equipo.
                          </p>
                        </div>
                        <NavLink
                          to={shirt.link}
                          style={{ fontFamily: "Montserrat" }}
                          className="inline-block text-white cursor-pointer rounded-md border-2 border-morado-claro bg-morado-claro px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-purple-700 hover:border-purple-700 w-fit"
                        >
                          Personalizar
                        </NavLink>
                      </div>
                    </div>
                  </LayerStackCard>
                );
              }

              return (
                <LayerStackCard
                  key={shirt.id}
                  className="bg-white text-black border border-gray-200 overflow-hidden rounded-xl"
                >
                  <div className="flex h-full flex-col p-6 gap-4">
                    <div className="flex items-center justify-between">
                      <span
                        style={{ fontFamily: "Montserrat" }}
                        className="text-xs font-bold tracking-widest uppercase text-morado-exito"
                      >
                        {`0${index + 1}`}
                      </span>
                      <div className="size-1.5 rounded-full bg-morado-exito/30" />
                    </div>

                    <div className="relative flex-1 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                      <img
                        src={shirt.image}
                        alt={shirt.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-4"
                        style={{
                          contentVisibility: "auto",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="h-px w-8 bg-morado-exito" />
                      <h2
                        style={{ fontFamily: "Chakra" }}
                        className="text-lg font-bold tracking-tight leading-tight"
                      >
                        {shirt.name}
                      </h2>
                      <p
                        style={{ fontFamily: "Montserrat1" }}
                        className="text-sm leading-relaxed text-gray-600"
                      >
                        Diseña y personaliza esta prenda con los colores de tu
                        equipo.
                      </p>
                    </div>
                    <NavLink
                      to={shirt.link}
                      style={{ fontFamily: "Montserrat" }}
                      className="inline-block text-white cursor-pointer rounded-md border-2 border-morado-claro bg-morado-claro px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-purple-700 hover:border-purple-700 w-fit"
                    >
                      Personalizar
                    </NavLink>
                  </div>
                </LayerStackCard>
              );
            })}
          </LayerStack>
        </div>

        {/* Grid para desktop */}
        <div className="hidden lg:grid mx-auto grid max-w-6xl place-items-center grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                style={{ fontFamily: "Arboria" }}
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
                style={{ fontFamily: "Montserrat" }}
                className="inline-block text-white relative cursor-pointer rounded-md border-2 border-morado-claro bg-morado-claro px-5 py-2 mt-4 text-sm font-semibold transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:border-purple-600 hover:text-white shadow-sm"
              >
                Personalizar
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-6 bg-white">
        {/* TÍTULO */}
        <header className="text-center mb-20">
          <h1
            style={{ fontFamily: "Chakra" }}
            className="md:text-3xl mb-5 lg:text-[4.10rem] font-extrabold uppercase tracking-normal"
          >
            LA FUERZA DE TUS IDEAS <br /> INICIA{" "}
            <span className="text-morado-exito">AQUÍ</span>
          </h1>

          <p
            style={{ fontFamily: "Montserrat1" }}
            className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl font-light leading-tight"
          >
            Explora nuestra experiencia interactiva y diseña tus uniformes
            personalizados paso a paso, 100% en línea. <br /> <br /> En esta
            sección aprenderás como hacerlo.
          </p>

          {/* <div className="w-30 h-2.5 bg-morado-exito mx-auto mt-8 rounded-full"></div> */}
          <div className="flex justify-center">
            <div className="w-25 h-2 bg-morado-exito mt-16 rounded-full"></div>
          </div>
        </header>

        {/* BorderGlide para móviles y tablet */}
        <div className="lg:hidden">
          <BorderGlide
            className="max-w-2xl mx-auto h-96"
            autoPlayInterval={9000}
            borderDuration={7000}
            borderColor="radial-gradient(ellipse, #6D28D9, transparent)"
            borderWidth="6rem"
          >
            {steps.map((step) => (
              <BorderGlideCard
                key={step.id}
                className="w-full h-full rounded-xl"
              >
                <BorderGlideContent className="flex flex-col h-full justify-between p-8 space-y-4 bg-white">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span
                        style={{ fontFamily: "Montserrat" }}
                        className="text-xs font-bold tracking-widest uppercase text-morado-exito"
                      >
                        {step.paso}
                      </span>
                      <div className="size-2 rounded-full bg-morado-exito" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-px w-12 bg-morado-exito" />
                      <h2
                        style={{ fontFamily: "Chakra" }}
                        className="text-2xl font-bold tracking-tight leading-tight text-black"
                      >
                        {step.title}
                      </h2>
                      <p
                        style={{ fontFamily: "Montserrat1" }}
                        className="text-sm leading-relaxed text-gray-700"
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="max-h-32 object-contain"
                    />
                  </div>
                </BorderGlideContent>
              </BorderGlideCard>
            ))}
          </BorderGlide>
        </div>

        {/* Grid para desktop */}
        <section className="relative max-w-6xl mx-auto hidden lg:block">
          {/* Línea central */}
          <span className="absolute left-1/2 -top-9.75 h-[90%] w-1 bg-semi-blanquito -translate-x-1/2 z-0"></span>

          {/* PASO 1 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-25">
            <div className="absolute left-1/2 top-5 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={TShirtIcon} className="w-7 h-7" />
            </div>

            <header className="md:text-right md:pr-19">
              <CardTilt className="inline-block" tiltMaxAngle={15} scale={1.05}>
                <CardTiltContent className="relative rounded-2xl bg-white p-6 w-83.75 h-46 border-2 border-[rgba(129,128,128,0.54)] -mt-10 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-end gap-2 mb-5">
                    <h3
                      style={{ fontFamily: "Chakra" }}
                      className="font-bold text-lg"
                    >
                      Elige el tipo de prenda
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6D28D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-hanger"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
                    </svg>
                  </div>
                  <p
                    style={{ fontFamily: "Montserrat1" }}
                    className=" text-sm mb-5"
                  >
                    Seleccione la maqueta del modelo de prenda que deseas
                    adquirir.
                  </p>

                  <span
                    style={{ fontFamily: "Montserrat" }}
                    className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                  >
                    PASO 01
                  </span>
                </CardTiltContent>
              </CardTilt>
            </header>

            <figure className="flex justify-center -mt-10">
              <img
                src={Personaliza}
                className="max-w-sm rounded-lg shadow-md"
              />
            </figure>
          </article>

          {/* PASO 2 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-21">
            <div className="absolute left-1/2 top-26 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
              {/* absolute left-1/2 top-6 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg */}
              <img src={DiagonalLinesIcons} className="w-7 h-7" />
            </div>

            <figure className="flex justify-center">
              <img
                src={Tela}
                className=" mt-11 object-cover rounded-[10px] shadow-md max-w-xs max-h-48"
              />
            </figure>
            <header className="md:text-right mt-11 md:pr-32">
              <CardTilt className="inline-block" tiltMaxAngle={15} scale={1.05}>
                <CardTiltContent className="relative rounded-2xl bg-white p-6 w-83.75 h-46 border border-[rgba(129,128,128,0.54)] transition-all duration-300 shadow-lg text-left md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6D28D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-ruler"
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
                      style={{ fontFamily: "Chakra" }}
                      className="font-bold text-lg mb-2 text-left md:text-left"
                    >
                      Tipo de Tela
                    </h3>
                  </div>
                  <p
                    style={{ fontFamily: "Montserrat1" }}
                    className="text-sm mb-3 text-left"
                  >
                    Elige una opción de nuestras telas con tecnología dri-fit.
                  </p>
                  <span
                    style={{ fontFamily: "Montserrat" }}
                    className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                  >
                    PASO 02
                  </span>
                </CardTiltContent>
              </CardTilt>
            </header>
          </article>

          {/* PASO 3 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-35">
            <div className="absolute left-1/2 top-16 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={PencilDrawingIcons} className="w-7 h-7" />
            </div>

            <header className="md:text-right md:pr-19">
              <CardTilt className="inline-block" tiltMaxAngle={15} scale={1.05}>
                <CardTiltContent className="relative rounded-2xl bg-white p-6 w-93.75 h-62.5 border-2 border-[rgba(129,128,128,0.54)] transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <h3
                      style={{ fontFamily: "Chakra" }}
                      className="text-center font-bold text-lg whitespace-nowrap"
                    >
                      Crea tu diseño - previsualización
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#6D28D9"
                      className="icon icon-tabler icons-tabler-filled icon-tabler-palette"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2c5.498 0 10 4.002 10 9c0 1.351 -.6 2.64 -1.654 3.576c-1.03 .914 -2.412 1.424 -3.846 1.424h-2.516a1 1 0 0 0 -.5 1.875a1 1 0 0 1 .194 .14a2.3 2.3 0 0 1 -1.597 3.99l-.156 -.009l.068 .004l-.273 -.004c-5.3 -.146 -9.57 -4.416 -9.716 -9.716l-.004 -.28c0 -5.523 4.477 -10 10 -10m-3.5 6.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m8 0a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m-4 -3a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
                    </svg>
                  </div>
                  <p
                    style={{ fontFamily: "Montserrat1" }}
                    className="text-sm mb-5 "
                  >
                    Aplica los colores de tu equipo y crea combinaciones para
                    cuerpo, mangas y cuello. Elige la tipografía para el nombre
                    de tu equipo o carga la imagen de tu logo. Agrega elementos
                    complementarios como patrocinadores.
                  </p>

                  <span
                    style={{ fontFamily: "Montserrat" }}
                    className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                  >
                    PASO 03
                  </span>
                </CardTiltContent>
              </CardTilt>
            </header>

            <figure className="flex justify-center gap-4">
              <img
                src={Mangas}
                className="w-40 rounded shadow-md max-w-xs max-h-48"
              />
              <img
                src={CuelloPaleta}
                className="w-40 rounded shadow-md max-w-xs max-h-48"
              />
            </figure>
          </article>

          {/* PASO 4 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-35">
            <div className="absolute left-1/2 top-16 -translate-x-1/2 z-20 border-4 border-morado-exito bg-white p-3 rounded-full shadow-lg">
              <img src={JerseyNumberIcons} className="w-7 h-7" />
            </div>
            <figure className="md:text-right flex gap-4 justify-center">
              <img src={Equipo} className="w-36 rounded shadow" />
              <img src={Jugador} className="w-36 rounded shadow" />
            </figure>

            <header className="md:text-right md:pr-32">
              <CardTilt className="inline-block" tiltMaxAngle={15} scale={1.05}>
                <CardTiltContent className="relative rounded-2xl bg-white p-6 w-83.75 h-46 border-2 border-[rgba(129,128,128,0.54)] transition-all duration-300 shadow-lg text-left md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6D28D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                    </svg>
                    <h3
                      style={{ fontFamily: "Chakra" }}
                      className="font-bold text-lg"
                    >
                      Detalles del Jugador
                    </h3>
                  </div>
                  <p
                    style={{ fontFamily: "Montserrat1" }}
                    className=" text-sm mb-3"
                  >
                    Añade nombre, número y elige la tipografía.
                  </p>

                  <span
                    style={{ fontFamily: "Montserrat" }}
                    className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                  >
                    PASO 04
                  </span>
                </CardTiltContent>
              </CardTilt>
            </header>
          </article>

          {/* PASO 5 */}
          <article className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="absolute left-1/2 top-16 -translate-x-1/2 z-20 border-4 border-morado-exito rounded-full bg-white p-3 shadow-lg">
              <img src={OrderCompletedIcons} className="w-7 h-7" />
            </div>

            <header className="md:text-right md:pr-19">
              <CardTilt className="inline-block" tiltMaxAngle={15} scale={1.05}>
                <CardTiltContent className="relative rounded-2xl bg-white p-6 w-83.75 h-50 border-2 border-[rgba(129,128,128,0.54)] transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <h3
                      style={{ fontFamily: "Chakra" }}
                      className="font-bold text-lg"
                    >
                      Realiza tu orden
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6D28D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-id"
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
                    style={{ fontFamily: "Montserrat1" }}
                    className=" text-sm mb-3"
                  >
                    Revisa tu diseño, agrega cantidad, talla, nombre y número de
                    jugador. No olvides tus datos personales para contactarte al
                    procesar la orden.
                  </p>

                  <span
                    style={{ fontFamily: "Montserrat" }}
                    className="inline-block px-4 py-1 text-sm font-semibold text-morado-exito border-morado-exito rounded-full bg-semi-blanco"
                  >
                    PASO 05
                  </span>
                </CardTiltContent>
              </CardTilt>
            </header>

            <figure className="flex justify-center">
              <img src={Contacto} className="max-w-sm rounded-lg shadow-md" />
            </figure>
          </article>

          <article className="text-center relative mb-2">
            <div className="absolute left-1/2 top-12 -translate-x-1/2 z-20 border-4 border-morado-exito bg-morado-exito p-3 rounded-full shadow-lg">
              <img src={ApprovalIcons} className="w-10 h-10" />
            </div>

            <CardTilt
              className="inline-block mt-41"
              tiltMaxAngle={15}
              scale={1.05}
            >
              <CardTiltContent className="relative rounded-2xl bg-white p-10 max-w-md border border-[rgba(129,128,128,0.94)] transition-all shadow-lg">
                <h3
                  style={{ fontFamily: "Chakra" }}
                  className="text-2xl font-bold mb-4"
                >
                  ¡LISTO!
                </h3>

                <p style={{ fontFamily: "Montserrat1" }} className="mb-6">
                  Has creado tu diseño y tu orden de pedido. Nuestro equipo te
                  contactará en breve para confirmar detalles y comenzar la
                  producción.
                </p>
                <figure className="">
                  <img src={LogoDark} className="mx-auto w-32 mb-6" />
                </figure>

                <a
                  href="#home"
                  style={{ fontFamily: "Montserrat" }}
                  className="inline-block bg-morado-exito text-white px-6 py-3 rounded-full font-semibold hover:bg-morado-claro transition"
                >
                  CREAR MI DISEÑO
                </a>
              </CardTiltContent>
            </CardTilt>
          </article>
        </section>
        {/* </div> */}
      </section>
    </main>
  );
}
