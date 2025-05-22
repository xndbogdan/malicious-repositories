import useSWR from "swr";
import { arrayURLFetcher, getTotalVolumeSum } from "lib/legacy";
import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "config/chains";
import { getServerUrl } from "config/backend";
import { bigNumberify } from "lib/numbers";

const ACTIVE_CHAIN_IDS = [ARBITRUM, FTM_TESTNET, U2U_TESTNET];

export function useTotalVolume() {
  const { data: totalVolume, error } = useSWR<any>(
    ACTIVE_CHAIN_IDS.map((chain) => getServerUrl(chain, "/total_volume")),
    {
      fetcher: arrayURLFetcher,
    }
  );
  if (!totalVolume || error) {
    return 0;
  }
  if (totalVolume?.length > 0) {
    return ACTIVE_CHAIN_IDS.reduce(
      (acc, chainId, index) => {
        const sum = getTotalVolumeSum(totalVolume[index])!;
        acc[chainId] = sum;
        acc.total = acc.total.add(sum || 0);
        return acc;
      },
      { total: bigNumberify(0)! }
    );
  }
}
