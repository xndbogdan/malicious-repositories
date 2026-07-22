import React, { useState, useEffect } from 'react';
import LocaContext from './locaContext';

const initialState = localStorage.getItem('lang') || 'en';

const LocaProvider = ({ children }) => {
  const [lang, setLang] = useState(initialState);

  useEffect(() => {
    const lang = new URLSearchParams(window.location.search).get('lang');
    console.log(lang)
    lang && setLang(lang);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    // eslint-disable-next-line
  }, [lang]);

  return (
    <LocaContext.Provider value={{ lang, setLang }}>
      {children}
    </LocaContext.Provider>
  );
};

export default LocaProvider;
