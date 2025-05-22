import useSWR from "swr";
import { arrayURLFetcher } from "lib/legacy";
import { getServerUrl } from "config/backend";
import { SUPPORTED_CHAIN_IDS } from "config/chains";

export function useFeesSummary() {
  const { data: feesSummary } = useSWR(
    SUPPORTED_CHAIN_IDS.map((chainId) => getServerUrl(chainId, "/fees_summary")),
    {
      fetcher: arrayURLFetcher,
    }
  );
  const feesSummaryByChain = {};
  for (let i = 0; i < SUPPORTED_CHAIN_IDS.length; i++) {
    if (feesSummary && feesSummary.length === SUPPORTED_CHAIN_IDS.length) {
      feesSummaryByChain[SUPPORTED_CHAIN_IDS[i]] = feesSummary[i];
    } else {
      feesSummaryByChain[SUPPORTED_CHAIN_IDS[i]] = {};
    }
  }

  return { data: feesSummaryByChain };
}
