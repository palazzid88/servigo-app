export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
            <p className="text-gray-700 font-medium">
              Confirmando tu reserva...
            </p>
          </div>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}