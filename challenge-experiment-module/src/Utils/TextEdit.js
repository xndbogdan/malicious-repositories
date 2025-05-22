const shortenString = (str) => {
    if(str.length < 10){
      return str
    }
    const firstFive = str.substring(0, 5);
    const lastFive = str.substring(str.length - 5);
    return `${firstFive}...${lastFive}`;
  };
  export default shortenString;