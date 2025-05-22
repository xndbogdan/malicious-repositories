export const sendWithDecimals = (number,decimals)=>{return BigInt(number) * (10n ** decimals)}
export const showWithoutDecimals = (number,decimals)=>{return number / (10n ** decimals)}