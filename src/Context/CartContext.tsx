import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getCart,
  addToCartApi,
  updateCartItemApi,
  removeFromCartApi,
  clearCartApi,
  type CartItem,
} from "../apis/modules/cart";

interface AddToCartInput {
  productId: string;
  variantId?: string | null;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (input: AddToCartInput) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user=localStorage.getItem("user");
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);


  useEffect(() => {
    if (!user) {
      setItems([]);
      setSubtotal(0);
      setTotalItems(0);
      return;
    }

    refreshCart();
  }, [user]);

  const refreshCart = async () => {
    if (!user) return;
    try {
      const res = await getCart();
      setItems(res.data.items);
      setSubtotal(res.data.subtotal);
      setTotalItems(res.data.totalItems);
      console.log("Refreshing cart",items);
    } catch (error: any) {
      console.error("Failed to fetch cart:", error?.response?.data?.message);
    }
  };


  const addToCart = async ({
    productId,
    variantId = null,
    quantity = 1,
  }: AddToCartInput) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      await addToCartApi(productId, variantId, quantity);
      await refreshCart();
      toast.success("Item added to cart");
      setIsCartOpen(true);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Couldn't add item to cart";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const previous = items;
    setItems((cur) => cur.filter((i) => i.id !== cartItemId));

    try {
      await removeFromCartApi(cartItemId);
      await refreshCart();
      toast.success("Item removed from cart");
    } catch (error: any) {
      setItems(previous); 
      const message =
        error?.response?.data?.message ?? "Couldn't remove item";
      toast.error(message);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    // Optimistic update
    const previous = items;
    setItems((cur) =>
      cur.map((i) => (i.id === cartItemId ? { ...i, quantity } : i)),
    );

    try {
      await updateCartItemApi(cartItemId, quantity);
      await refreshCart();
    } catch (error: any) {
      setItems(previous); 
      const message =
        error?.response?.data?.message ?? "Couldn't update quantity";
      toast.error(message);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await clearCartApi();
      setItems([]);
      setSubtotal(0);
      setTotalItems(0);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Couldn't clear cart";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        totalItems,
        isLoading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}