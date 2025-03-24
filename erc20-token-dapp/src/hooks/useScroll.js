import { useRef } from 'react';

const useScroll = () => {
  const scrollRef = useRef(null);
  const executeScroll = () => scrollRef.current && scrollRef.current.scrollIntoView();

  return [executeScroll, scrollRef];
};

export default useScroll;
