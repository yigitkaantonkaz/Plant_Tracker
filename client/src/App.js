import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';    
import Gallery from './pages/Gallery';
import PodDetail from './pages/PodDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <PageTransition locationKey={location.key}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pods/:id" element={<PodDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  );
};


export default App;
