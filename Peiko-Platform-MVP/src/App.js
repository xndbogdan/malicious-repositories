import React, { useContext, useEffect } from 'react';
import globalContext from './context/global/globalContext';
import AppRoutes from './components/routing/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => {

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
