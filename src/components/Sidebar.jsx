import React, { useState } from "react";

import {
  ChevronDownIcon,
  SwatchIcon,
  PhotoIcon,
  Square3Stack3DIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        top-24
        left-6
        w-72
        max-h-[calc(100vh-200px)]
        bg-purple-200/90
        backdrop-blur
        rounded-xl
        shadow-xl
        p-4
        overflow-y-auto
        z-20
      "
    >
      {/* Tela */}
      <Section
        title="Tipos de Tela"
        icon={SwatchIcon}
      >
        <Button text="Microfibra" />
        <Button text="Poliester" />
        <Button text="Nylon" />
        <Button text="Dry-Fit" />
      </Section>

      {/* Diseños */}
      <Section
        title="Diseños"
        icon={PhotoIcon}
      >
        <img
          src="/shirt1.png"
          className="w-full rounded-lg cursor-pointer"
        />

        <img
          src="/shirt2.png"
          className="w-full rounded-lg cursor-pointer mt-2"
        />
      </Section>

      {/* Cuerpo */}
      <Section
        title="Cuerpo"
        icon={Square3Stack3DIcon}
      >
        <Button text="Color" />
        <Button text="Degradado" />
      </Section>

      {/* Espalda */}
      <Section
        title="Espalda"
        icon={ArrowUpTrayIcon}
      >
        <Button text="Logo" />
        <Button text="Texto" />
      </Section>
    </aside>
  );
}

/* ======================
   Section
====================== */

function Section({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5">

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          justify-between
          items-center
          font-semibold
          mb-2
        "
      >
        <div className="flex items-center gap-2">

          {Icon && (
            <Icon className="w-5 h-5 text-purple-700" />
          )}

          {title}
        </div>

        <ChevronDownIcon
          className={`
            w-5 h-5 transition
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Contenido */}
      {open && (
        <div className="grid grid-cols-2 gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ======================
   Button
====================== */

function Button({ text }) {
  return (
    <button
      className="
        bg-purple-300
        rounded-lg
        py-1
        text-sm
        hover:bg-purple-400
        transition
      "
    >
      {text}
    </button>
  );
}
