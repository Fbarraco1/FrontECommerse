import React, { useEffect } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react'; 
import AppRouter from './AppRouter/AppRouter';

const App: React.FC = () => {
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
