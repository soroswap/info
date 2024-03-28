import {
  RouterEventType,
  RouterEventsAPIResponse,
} from "../types/router-events";
import axiosInstance from "./axios";

export const fetchAllEvents = async ({
  topic2,
}: {
  topic2?: RouterEventType;
}) => {
  const { data } = await axiosInstance.post<RouterEventsAPIResponse>(
    `/events/router`,
    { topic2 }
  );

  return data;
};

export const fetchEventsByPoolAddress = async ({
  poolAddress,
  topic2,
}: {
  poolAddress: string;
  topic2?: RouterEventType;
}) => {
  const { data } = await axiosInstance.post<RouterEventsAPIResponse>(
    `/events/pool/${poolAddress}`,
    { topic2 }
  );

  return data;
};
