import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getMyOrders,
  getUserOrderById,
  type ICreateOrderRequest,
} from "../apis/modules/orders";

export const orderKeys = {
  lists: ["orders", "list"] as const,
  list: (page: number, limit: number) =>
    ["orders", "list", page, limit] as const,
  detail: (orderId: string) => ["orders", "detail", orderId] as const,
};

export function useMyOrders(page = 1, limit = 10) {
  return useQuery({
    queryKey: orderKeys.list(page, limit),
    queryFn: () => getMyOrders(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useOrderById(orderId?: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId ?? ""),
    queryFn: () => getUserOrderById(orderId as string),
    enabled: !!orderId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateOrderRequest) => createOrder(payload),
    onSuccess: (order) => {
      queryClient.setQueryData(orderKeys.detail(order.id), order);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists });
    },
  });
}
