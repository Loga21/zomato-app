import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import './App.scss';
import ErrorBoundary from './containers/shared/ErrorBoundary/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import OrderOnline from './pages/OrderOnline/OrderOnline';
import Reviews from './pages/Reviews/Reviews';
import FoodImageGallery from './pages/FoodImageGallery/FoodImageGallery';
import CuisinesPage from './pages/CuisinesPage/CuisinesPage';
import CuisineDetailPage from './pages/CuisineDetailPage/CuisineDetailPage';
import Menu from './pages/Menu/Menu';
import Overview from './pages/Overview/Overview';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/cuisines' element={<CuisinesPage />} />
              <Route path='/cuisine-details' element={<CuisineDetailPage />}>
                <Route path='' element={<Overview />} />
                <Route path='order-online' element={<OrderOnline />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='photos' element={<FoodImageGallery />} />
                <Route path='menu' element={<Menu />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
library.add(fas, far, fab);
