import React, { createContext, useState, useEffect } from 'react';
import { useClient } from './ClientContext';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [Item, setItem] = useState("");
  const [Prod, setProd] = useState("");
  const { client, setClient } = useClient();


  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [Prod]);

  useEffect(() => {
    if (client) {
      fetch(`http://localhost:8080/cart/getAllCartProduct/${client}`)
        .then(response => response.json())
        .then(data => setCartItems(data))
        .catch(error => console.error('Error fetching cart items:', error));
    }
  }, [client, Item]);

  console.log("hii");
  const addToCart = async (productId) => {



    try {
      await fetch('http://localhost:8080/cart/insertCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          client: {
            email: client
          },
          productsData: {
            id: productId
          }
        })
      });
      setItem(productId);
      // Update local cartItems after successful addition
      setCartItems(prevItems => [
        ...prevItems,
        {
          id: new Date().getTime(), // Generate a temporary ID for this new item
          client: { email: client },
          productsData: { id: productId } // Add more fields if necessary
        }
      ]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {

    try {
      await fetch(`http://localhost:8080/cart/removeCart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },

      });

      // Update local cartItems after successful removal
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const getTotalCartItems = () => {
    return cartItems.length;
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    // setDeleteProductId(id)
    if (!id) {
      alert('Please enter a product ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        setProd(id);
        setDeleteProductId(''); // Clear input field
        fetchProducts(); // Refresh product list
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      // alert('Network error');
    }
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    handleDelete,
    setProd
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};
