import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import QuickViewModal from '@/components/QuickViewModal';
import CartDrawer from '@/components/CartDrawer';
import DriveConfigModal from '@/components/DriveConfigModal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <Hero />
      <main className="flex-1">
        <ProductGrid />
      </main>
      <QuickViewModal />
      <CartDrawer />
      <DriveConfigModal />
      <Footer />
    </div>
  );
}
