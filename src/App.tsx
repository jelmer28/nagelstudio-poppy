import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Treatments from "@/components/Treatments";
import SignatureCraft from "@/components/SignatureCraft";
import Gallery from "@/components/Gallery";
import Artist from "@/components/Artist";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { BookingModalProvider } from "@/lib/BookingModalContext";

export default function App() {
  return (
    <BookingModalProvider>
      <a
        href="#main"
        className="focus-ring fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-4 py-2 text-sm text-parchment transition-transform focus:translate-y-0"
      >
        Ga naar inhoud
      </a>
      <SmoothScroll>
        <Nav />
        <main id="main">
          <Hero />
          <Philosophy />
          <Treatments />
          <SignatureCraft />
          <Gallery />
          <Artist />
          <Reviews />
          <InstagramGrid />
          <Booking />
          <FAQ />
        </main>
        <Footer />
      </SmoothScroll>
      <BookingModal />
    </BookingModalProvider>
  );
}
