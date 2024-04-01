import { useRouter } from "next/router";

type QueryNetwork = "mainnet" | "testnet";

const useQueryNetwork = () => {
  const router = useRouter();

  const query = router.query.network;

  const isValidQuery = query === "mainnet" || query === "testnet";

  if (!router.isReady) return { network: undefined, isValidQuery };

  const network = (isValidQuery ? query : "mainnet") as
    | QueryNetwork
    | undefined;

  return { network, isValidQuery, query };
};

export default useQueryNetwork;
