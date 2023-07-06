import React, { useState } from "react";
import "./App.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedItems);
    } else {
      // If the item doesn't exist in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedItems);
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  };

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to calculate the subtotal of all items in the cart
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shopping Cart Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

      {/* Grid layout for Available Items and Cart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Available Items */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Items</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-white rounded-md p-4 shadow-md">
              <span>Item 1</span>
              <button
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold rounded transition-colors"
                onClick={() => addToCart({ id: 1, name: "Item 1", price: 10 })}
              >
                Add to Cart
              </button>
            </li>
            {/* Add more list items here */}
          </ul>
        </div>

        {/* Cart */}
        <div>
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          {cartItems.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  className="flex items-center justify-between bg-white rounded-md p-4 shadow-md"
                  key={item.id}
                >
                  <span>{item.name}</span>
                  <div className="flex items-center">
                    <button
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white font-semibold rounded-l transition-colors"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1} // Disable the button when quantity is 1
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-3 py-2 bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white font-semibold rounded-r transition-colors"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white font-semibold rounded transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
              <li className="flex items-center justify-between bg-white rounded-md p-4 shadow-md">
                <span className="font-semibold">Total Quantity:</span>
                <span className="font-semibold">
                  {calculateTotalQuantity()}
                </span>
              </li>
              <li className="flex items-center justify-between bg-white rounded-md p-4 shadow-md">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-semibold">${calculateSubtotal()}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
