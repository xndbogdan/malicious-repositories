import { SUPPORTED_CHAIN_IDS } from "config/chains";
import useSWR from "swr";
import { getServerUrl } from "config/backend";
import { arrayURLFetcher } from "lib/legacy";

export default function useUniqueUsers() {
  const { data: totalUsers } = useSWR<any>(
    SUPPORTED_CHAIN_IDS.map((chain) => getServerUrl(chain, "/user_stats")),
    {
      fetcher: arrayURLFetcher,
    }
  );
  // console.log("Dashboard: totalUniqueUsers ", totalUsers);
  return totalUsers?.reduce(
    (acc, userInfo, index) => {
      const currentChainUsers = userInfo?.totalUniqueUsers ?? 0;
      acc[SUPPORTED_CHAIN_IDS[index]] = currentChainUsers;
      acc.total += currentChainUsers;
      return acc;
    },
    {
      total: 0,
    }
  );
}
