import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addProductToWishlist, getWishlistIds, removeProductFromWishlist } from "../apis/modules/wishlist";
import { toast } from "sonner";

export function useWishlist(){
    const user=localStorage.getItem("user");
    const queryClient=useQueryClient();
    const isAuthenticated=!!user;

    const{
        data:wishlistIds=[],
        isLoading
    }=useQuery({
        queryKey:["wishlistIds"],
        queryFn:getWishlistIds,
        staleTime:10*60*1000,
        refetchOnWindowFocus:false,
        enabled:isAuthenticated
    });


    const isProductInWishlist=(productId:string)=>{
        return wishlistIds.includes(productId);
    }

    const toggle=useMutation({
        mutationFn:async({productId,isCurrentlyLoved}:{productId:string, isCurrentlyLoved:boolean})=>{
            return isCurrentlyLoved?
                removeProductFromWishlist(productId)
            :
                addProductToWishlist(productId)
        },
        onMutate:async({productId, isCurrentlyLoved})=>{
            await queryClient.invalidateQueries({queryKey:["wishlistIds"]});

            const previousIds=queryClient.getQueryData<string[]>(["wishlistIds"])??[];

            queryClient.setQueryData<string[]>(["wishlistIds"], (old = []) =>
                isCurrentlyLoved
                ? old.filter((id) => id !== productId)
                : old.includes(productId)
                    ? old
                    : [...old, productId],
            );

            return { previousIds }
        },
        onError:(_err,_vars,context)=>{
            if(context?.previousIds){
                queryClient.setQueryData(["wishlistIds"],context.previousIds);
            }
            toast.error("Failed to update wishlist. Please try again");
        },
        onSuccess:(_data,{isCurrentlyLoved})=>{
            toast.success(isCurrentlyLoved?"Removed from wishlist":"Added to wishlist");
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:["wishlistIds"]});
            queryClient.invalidateQueries({queryKey:["wishlist"]});
        }
    })

    return{
        wishlistIds,
        isLoading,
        isProductInWishlist,
        toggleWishlist:toggle.mutate,
        isToggling:toggle.isPending
    }


}