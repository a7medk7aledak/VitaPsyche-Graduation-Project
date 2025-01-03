"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { useCart } from "@hooks/useCart";

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, products, removeItem, addItem } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    addItem(id, quantity); // Update the quantity in the cart
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/products">
            <button className="text-blue-500 hover:underline mt-4 inline-block">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null;

              // Get the main image URL for the product
              const mainImage = product.images.find(
                (img) => img.type === "main"
              );

              return (
                <li key={cartItem.id} className="py-4 flex items-center gap-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={mainImage?.url || "/images/placeholder.jpg"}
                      alt={product.title || "Unknown Product"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.title || "Unknown Product"}
                    </h2>
                    <p className="text-gray-600">
                      Price: {product.price || "N/A"}
                    </p>
                    <p className="text-gray-600">Quantity:</p>
                    <select
                      value={cartItem.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          cartItem.id,
                          Number(e.target.value)
                        )
                      }
                      className="mt-1 block w-20 p-2 border border-gray-300 rounded"
                    >
                      {[...Array(4)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeItem(cartItem.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>{`EGP ${totalPrice.toFixed(2)}`}</span>
            </div>
            <Link href={"/cart/checkout"}>
              <button className="mt-4 w-full  py-3 bg-[#216862] text-white font-semibold text-lg rounded-lg hover:bg-[#205f5a] transition-colors">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
