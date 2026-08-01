import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './content/index.jsx';
import { ToastProvider } from './components/Toast.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ContentProvider>
      <ToastProvider>
        <ScrollManager />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </ToastProvider>
    </ContentProvider>
  );
}
