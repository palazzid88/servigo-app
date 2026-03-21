import "./globals.css";

export const metadata = {
  title: "ServiGO – Traslado de Vehículos",
  description: "Coordinamos el traslado de tu vehículo al taller y te lo devolvemos sin que tengas que moverte.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-[#565656] font-[Inter,sans-serif] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}