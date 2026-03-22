import { Suspense } from "react";
import FailureClient from "./FailureClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FailureClient />
    </Suspense>
  );
}