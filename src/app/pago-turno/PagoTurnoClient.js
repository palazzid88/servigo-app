import { Suspense } from "react";
import PagoTurnoClient from "./PagoTurnoClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PagoTurnoClient />
    </Suspense>
  );
}