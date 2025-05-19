import { UTX_STATS_API_URL } from "config/backend";
import { FTM_TESTNET, U2U_TESTNET } from "config/chains";
import { bigNumberify } from "lib/numbers";
import useSWR from "swr";

export function useVolumeInfo() {
  const url = `${UTX_STATS_API_URL}/volume/24h`;

  const { data } = useSWR(
    url,
    async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      return {
        [FTM_TESTNET]: bigNumberify(json[FTM_TESTNET]),
        [U2U_TESTNET]: bigNumberify(json[U2U_TESTNET]),
        total: bigNumberify(json.total),
      };
    },
    {
      refreshInterval: 60000,
    }
  );
  return data;
}
