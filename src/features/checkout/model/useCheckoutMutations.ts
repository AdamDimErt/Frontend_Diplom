/** @format */

import {
  increaseOrderItem,
  decreaseOrderItem,
  removeOrderItem,
  clearOrder,
} from "@/entities/order/api/orderApi";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCheckoutMutations = (orderId?: string) => {
  const queryClient = useQueryClient();

  return {
    increase: useMutation({
      mutationFn: increaseOrderItem,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        }),
    }),
    decrease: useMutation({
      mutationFn: decreaseOrderItem,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        }),
    }),
    remove: useMutation({
      mutationFn: removeOrderItem,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        }),
    }),
    clear: useMutation({
      mutationFn: () => clearOrder(orderId!),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        }),
    }),
  };
};
