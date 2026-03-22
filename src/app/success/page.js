import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessClient />
    </Suspense>
  );
}