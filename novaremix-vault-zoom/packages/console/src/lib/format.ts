export const fmtUsd = (n: number) =>
  "$" + Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

export const fmtPct = (n: number) => (Number(n) * 100).toFixed(1) + "%";

export const fmtApy = (bps: number) => (Number(bps) / 100).toFixed(2) + "%";

export const fmtBpsWeight = (bps: number) => (bps / 100).toFixed(1) + "%";
