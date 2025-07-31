import '../styles/globals.css';
import { CartProvider } from '../components/CartContext';
import TopBar from '../components/TopBar';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <TopBar />
      <MainNav />
      <main className="pt-20 ">
        <Component {...pageProps} />
      </main>
      <Footer/>
    </CartProvider>
  );
}

export default MyApp;
