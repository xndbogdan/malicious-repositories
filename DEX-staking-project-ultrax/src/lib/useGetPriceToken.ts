export const useGetPriceToken = () => {
  //MOCK
  return {
    utx: "1000000000000000000000000000000",
    u2u: "1000000000000000000000000000000",
  };
};

export const usePriceU2U = () => {
  const prices = useGetPriceToken();

  return prices["u2u"];
};

export const usePriceUTX = () => {
  const prices = useGetPriceToken();

  return prices["utx"];
};
