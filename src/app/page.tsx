import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

import BuildFeatures from "@/components/BuildFeatures";
import EventsTable from "@/components/EventsTable";
import ExploreCards from "@/components/ExploreCards";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ScrollNav from "@/components/ScrollNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ScrollNav />
      <Hero />
      <Stats />
      <EventsTable />
      <BuildFeatures />
      <Marquee />
      <ExploreCards />
      <Footer />
    </main>
  );
}
