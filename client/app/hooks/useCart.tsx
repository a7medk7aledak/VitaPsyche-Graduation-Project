import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { removeFromCart, addToCart } from "@store/cartSlice";
import productsData from "../content/products.json";
import { useMemo } from "react";

export interface Product {
  id: string;
  title: string;
  price: string;
  images: { id: string; url: string; type: string }[];
}

export const useCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { products }: { products: Product[] } = productsData;

  // Calculate total price using useMemo
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return (
        total +
        (product
          ? parseFloat(product.price.replace("EGP", "")) * cartItem.quantity
          : 0)
      );
    }, 0);
  }, [cartItems, products]);

  const addItem = (id: string, quantity: number) => {
    dispatch(addToCart({ id, quantity }));
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return { cartItems, totalPrice, products, removeItem, addItem };
};
