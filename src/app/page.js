import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Turnos from "@/components/Turnos";
import Counter from "@/components/Counter";
import Servicios from "@/components/Servicios";
import ComoFunciona from "@/components/ComoFunciona";
import Testimonios from "@/components/Testimonios";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Turnos />
      <Counter />
      <Servicios />
      <ComoFunciona />
      <Testimonios />
      <Footer />
    </>
  );
}