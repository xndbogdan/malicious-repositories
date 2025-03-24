const { NumberFormat } = Intl;

const n6 = new NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
});
const n4 = new NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

const c2 = new NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return '';
};

const tokenValue = (value, decimals) => (decimals ? value / Math.pow(10, decimals) : value);

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
const tokenValueTxt = (value, decimals, symbol) =>
  `${n4.format(tokenValue(value, decimals))} ${symbol}`;

// Exporting the constants and functions
export {
  n6,
  n4,
  c2,
  getEllipsisTxt,
  tokenValue,
  tokenValueTxt,
};