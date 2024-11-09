import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBids, placeBid } from "../api/bids";

interface UseBidsParams {
  product: number;
}

export const useBids = (params: UseBidsParams) => {
  return useQuery(["bids", params], () => fetchBids(params), {
    keepPreviousData: true,
  });
};

export const usePlaceBid = () => {
  const queryClient = useQueryClient();

  return useMutation(placeBid, {
    onSuccess: () => {
      queryClient.invalidateQueries("bids");
    },
    onError: (error) => {
      console.error("Error placing bid:", error);
    },
  });
};
