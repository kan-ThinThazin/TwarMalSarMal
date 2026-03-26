import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shops from './pages/Shops';
import ShopDetail from './pages/ShopDetail';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Recommendations from './pages/Recommendations';
import Reviews from './pages/Reviews';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/shops/:id" element={<ShopDetail />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;