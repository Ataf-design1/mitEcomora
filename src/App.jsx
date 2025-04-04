import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AppRoutes from './Routes/AppRoutes';
import { FirebaseProvider } from './Context/FirebaseContext';

const App = () => {
  return (
    <FirebaseProvider>
      <div>
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </FirebaseProvider>
  );
};

export default App;