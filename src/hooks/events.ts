import { fetchAllEvents, fetchEventsByPoolAddress } from "../services/events";
import { RouterEventType } from "../types/router-events";
import { useQuery } from "@tanstack/react-query";
import useQueryNetwork from "./use-query-network";

const key = "events";

export const useQueryAllEvents = ({ topic2 }: { topic2?: RouterEventType }) => {
  const { network, isValidQuery } = useQueryNetwork();

  return useQuery({
    queryKey: [key, network, topic2],
    queryFn: () => fetchAllEvents({ topic2 }),
    enabled: isValidQuery,
  });
};

export const useQueryEventsByPoolAddress = ({
  poolAddress,
  topic2,
}: {
  poolAddress: string;
  topic2?: RouterEventType;
}) => {
  const { network, isValidQuery } = useQueryNetwork();

  return useQuery({
    queryKey: [key, network, poolAddress, topic2],
    queryFn: () => fetchEventsByPoolAddress({ poolAddress, topic2 }),
    enabled: !!poolAddress && isValidQuery,
  });
};
