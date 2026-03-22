import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SobreElTour from "@/components/SobreElTour";
import CiudadesYFechas from "@/components/CiudadesYFechas";
import Partners from "@/components/Partners";
import Galeria from "@/components/Galeria";
import Footer from "@/components/Footer";
import ScrollNav from "@/components/ScrollNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-monad-bg">
      <Navbar />
      <ScrollNav />
      <Hero />
      <Stats />
      <SobreElTour />
      <CiudadesYFechas />
      <Partners />
      <Galeria />
      <Footer />
    </main>
  );
}
