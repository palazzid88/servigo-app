export default function Footer() {
  return (
    <footer className="bg-[#565656] text-white py-12 text-center text-sm">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        
        {/* 📞 CONTACTO */}
        <div className="space-y-3">
          
          <img
            src="/img/logo-blanco.png"
            alt="Servigo"
            className="h-16 mx-auto transition hover:scale-105"
          />

          <h3 className="text-lg font-semibold text-[#f29101]">
            Contacto
          </h3>

          <p>
            <a
              href="mailto:servigo@gmail.com"
              className="hover:underline hover:text-[#f29101] transition"
            >
              servigo@gmail.com
            </a>
          </p>

          <p>
            <a
              href="https://wa.me/5491132033363"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-[#f29101] transition"
            >
              WhatsApp: +54 9 11 3203-3363
            </a>
          </p>

          <p>📍 Zona Norte, Buenos Aires, Argentina</p>

          <div className="border-t border-gray-500 mt-6 pt-4 text-gray-300">
            © 2025 <strong>Servigo</strong>. Todos los derechos reservados.
            <br />
            Hecho con pasión y eficiencia 🚗
          </div>
        </div>

        {/* 💻 DESARROLLADOR */}
        <div className="flex flex-col items-center space-y-2">
          <p>Desarrollado por:</p>

          <a
            href="https://impulsardigital.com.ar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/img/logo-footer.png"
              alt="Impulsar Digital"
              className="h-16 mx-auto transition hover:scale-105"
            />
          </a>

          <p>agencia de desarrollo web & aplicaciones</p>

          <a
            href="https://wa.me/543364189749"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#f29101] transition"
          >
            +54 9 336 418 9749
          </a>
        </div>
      </div>
    </footer>
  );
}