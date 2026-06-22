import Scene3DWrapper from "@/components/Scene3DWrapper";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Team from "@/components/Team";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import FullscreenLock from "@/components/FullscreenLock";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      {}
      <Scene3DWrapper />

      <FullscreenLock>
        {/* Diagnostics preloader */}
        <Preloader />

        {}
        <ScrollProvider>
          <ScrollProgress />
          <main className="relative z-10 pointer-events-none">
            <Hero />
            <Product />
            <Team />
            <Contacts />
            <Footer />
          </main>
        </ScrollProvider>
      </FullscreenLock>
    </>
  );
}
