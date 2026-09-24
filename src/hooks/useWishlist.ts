import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProductToWishlist, removeProductFromWishlist } from "../apis/modules/wishlist";
import { toast } from "sonner";

export const useAddProductToWishlist=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(productId:string)=>addProductToWishlist(productId),
        onSuccess:()=>{
            toast.success("Added to wishlist successfully"),
            queryClient.invalidateQueries({queryKey:["wishlist"]})
        },
        onError:(err:any)=>{
            const message =
                err?.response?.data?.message ??
                    "Something went wrong. Please try again.";
            toast.error(message);
        }
    })
}

export const useRemoveProductFromWishlist=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(productId:string)=>removeProductFromWishlist(productId),
        onSuccess:()=>{
            toast.success("Removed from wishlist successfully");
            queryClient.invalidateQueries({queryKey:["wishlist"]});
        },
        onError:(err:any)=>{
             const message =
                err?.response?.data?.message ??
                    "Something went wrong. Please try again.";
            toast.error(message);
        }
    })
}