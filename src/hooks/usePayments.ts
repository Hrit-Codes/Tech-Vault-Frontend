import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initiateKhalti, verifyKhalti } from "../apis/modules/payments";
import { orderKeys } from "./useOrders";

export function useInitiateKhalti() {
  return useMutation({
    mutationFn: (orderId: string) => initiateKhalti(orderId),
  });
}

export function useVerifyKhalti() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pidx: string) => verifyKhalti(pidx),
    onSuccess: ({ orderId }) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists });
    },
  });
}
