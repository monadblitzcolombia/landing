import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Stats from "@/components/Stats";
import Schedule from "@/components/Schedule";
import BuildFeatures from "@/components/BuildFeatures";
import EventsTable from "@/components/EventsTable";
import Marquee from "@/components/Marquee";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import ExploreCards from "@/components/ExploreCards";
import Footer from "@/components/Footer";
import ScrollNav from "@/components/ScrollNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ScrollNav />
      <Hero />
      <Countdown />
      <Stats />
      <EventsTable />
      <Schedule />
      <BuildFeatures />
      <Marquee />
      <Gallery />
      <FAQ />
      <ExploreCards />
      <Footer />
    </main>
  );
}
