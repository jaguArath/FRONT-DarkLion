import Sidebar from "../components/Sidebar";

export default function Camisola() {
  return (
    <div className="min-h-screen relative">

      {/* Sidebar flotante */}
      <Sidebar />

      {/* Panel principal */}
      <div className="pl-[20rem] pt-10">

        {/* Aquí tu visor 3D */}
        <div className="flex justify-center items-center h-[80vh]">

          <h1 className="text-2xl font-bold">
            Aquí va el visor 3D
          </h1>

        </div>

      </div>

    </div>
  );
}
