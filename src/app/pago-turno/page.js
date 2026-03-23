import { Suspense } from "react";
import PagoTurnoClient from "./PagoTurnoClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
            <p className="text-gray-700 font-medium">Cargando datos de la reserva...</p>
          </div>
        </div>
      }
    >
      <PagoTurnoClient />
    </Suspense>
  );
}