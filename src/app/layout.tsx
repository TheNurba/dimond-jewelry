import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'Dimond — Премиум ювелир үкгом',
  description: 'Бриллианттар, алтын, премиум ювелирдик буюмдар. Dimond ювелир үкгом.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ky" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#0A0A0A',
                color: '#fff',
                borderRadius: '999px',
                padding: '10px 18px',
                fontSize: '14px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
