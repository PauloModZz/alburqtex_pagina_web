import { lazy, Suspense, useLayoutEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ClientsSection from './components/ClientsSection';
import CommentsSection from './components/CommentsSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import { useSeo } from './lib/seo';

// Las vistas internas de AppShell (catálogo, legal, acceso, cuenta, pedido)
// también se cargan bajo demanda: quien solo entra al inicio no descarga el
// catálogo completo ni los formularios de registro que no va a abrir.
const CatalogPage = lazy(() => import('./components/CatalogPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const AccountPage = lazy(() => import('./components/account/AccountPage'));
const CartPage = lazy(() => import('./components/order/CartPage'));

// Las 6 páginas nuevas se cargan bajo demanda (code-splitting) — evita que
// alguien que solo entra al inicio tenga que descargar los 8 artículos del
// blog y el resto de secciones nuevas de una sola vez.
const LegalPageRoute = lazy(() => import('./components/layout/LegalPageRoute'));
const FaqPage = lazy(() => import('./components/faq/FaqPage'));
const GalleryPage = lazy(() => import('./components/gallery/GalleryPage'));
const SizeGuidePage = lazy(() => import('./components/sizes/SizeGuidePage'));
const ClientsPage = lazy(() => import('./components/clients/ClientsPage'));
const BlogIndexPage = lazy(() => import('./components/blog/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./components/blog/BlogPostPage'));
const AdminCommentsPage = lazy(() => import('./components/admin/AdminCommentsPage'));

function RouteFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
      <div
        className="w-8 h-8 rounded-full border-2 border-black/10 animate-spin"
        style={{ borderTopColor: '#C9973F' }}
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}

/**
 * Cada ruta nueva comienza arriba, sin heredar el scroll de la página
 * anterior — pero solo al entrar a una página (PUSH). Al volver con
 * "Volver"/atrás del navegador (POP), se deja que el navegador restaure la
 * posición donde estabas, en vez de forzar el scroll arriba también ahí.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType !== 'POP') window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

type View = 'hero' | 'catalog' | 'legal' | 'auth' | 'account' | 'cart';

function AppShell() {
  const { user } = useAuth();
  const { isEnglish } = useLanguage();
  const [view, setView] = useState<View>('hero');
  const [authReturnView, setAuthReturnView] = useState<View>('hero');
  const [legalTarget, setLegalTarget] = useState<string | undefined>(undefined);

  useSeo({
    title: isEnglish ? 'Custom apparel and textile personalization' : 'Bordado y confección personalizada',
    description: isEnglish
      ? 'Garment manufacturing, embroidery, textile printing and sublimation in Guayaquil, Ecuador, for companies, institutions and individuals.'
      : 'Confección, bordado, estampado y sublimado de alto nivel en Guayaquil para personas, instituciones y empresas.',
    path: '/',
  });

  // Catálogo, acceso, cuenta y pedido son vistas internas de la ruta principal;
  // también deben empezar arriba cuando se cambia entre ellas.
  useLayoutEffect(() => {
    if (view === 'legal' && legalTarget) return;
    window.scrollTo(0, 0);
  }, [view, legalTarget]);

  const openLegal = (sectionId?: string) => {
    setLegalTarget(sectionId);
    setView('legal');
  };

  const goToAuth = (returnView: View) => {
    setAuthReturnView(returnView);
    setView('auth');
  };

  const openAccount = () => {
    if (user) setView('account');
    else goToAuth('account');
  };

  let page: ReactNode;
  if (view === 'catalog') {
    page = <CatalogPage onBack={() => setView('hero')} onOpenAccount={openAccount} onOpenCart={() => setView('cart')} />;
  } else if (view === 'legal') {
    page = <LegalPage onBack={() => setView('hero')} scrollToId={legalTarget} />;
  } else if (view === 'auth') {
    // If they cancel out of login/register without actually signing in,
    // never send them to a view that requires a user (like "account") —
    // that would render blank. Fall back to the catalog instead.
    const authBackTarget = authReturnView === 'account' && !user ? 'catalog' : authReturnView;
    page = <AuthPage onBack={() => setView(authBackTarget)} onAuthenticated={() => setView(authReturnView)} />;
  } else if (view === 'account') {
    page = <AccountPage onBack={() => setView('catalog')} />;
  } else if (view === 'cart') {
    page = (
      <CartPage
        onBack={() => setView('catalog')}
        onRequireAuth={() => goToAuth('cart')}
        onOpenCatalog={() => setView('catalog')}
      />
    );
  } else {
    page = (
      <>
        <Hero onOpenCatalog={() => setView('catalog')} />
        <AboutSection />
        <LocationSection />
        <ClientsSection />
        <CommentsSection onRequireAuth={() => goToAuth('hero')} />
        <Footer onOpenLegal={openLegal} />
      </>
    );
  }

  return (
    <>
      {/* Suspense propio: al abrir el catálogo o el acceso solo se reemplaza la
          página, no el aviso de cookies que ya estaba en pantalla. */}
      <Suspense fallback={<RouteFallback />}>{page}</Suspense>
      <CookieConsent onOpenLegal={openLegal} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/legal" element={<LegalPageRoute />} />
                <Route path="/preguntas-frecuentes" element={<FaqPage />} />
                <Route path="/galeria" element={<GalleryPage />} />
                <Route path="/guia-de-tallas" element={<SizeGuidePage />} />
                <Route path="/clientes" element={<ClientsPage />} />
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/admin/comentarios" element={<AdminCommentsPage />} />
                <Route path="/en/legal" element={<LegalPageRoute />} />
                <Route path="/en/preguntas-frecuentes" element={<FaqPage />} />
                <Route path="/en/galeria" element={<GalleryPage />} />
                <Route path="/en/guia-de-tallas" element={<SizeGuidePage />} />
                <Route path="/en/clientes" element={<ClientsPage />} />
                <Route path="/en/blog" element={<BlogIndexPage />} />
                <Route path="/en/blog/:slug" element={<BlogPostPage />} />
                <Route path="/en/*" element={<AppShell />} />
                <Route path="/*" element={<AppShell />} />
              </Routes>
            </Suspense>
          </LanguageProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
