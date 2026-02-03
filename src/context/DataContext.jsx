import React, { createContext, useContext, useState, useEffect } from 'react';
import { DUMMY_ITEMS } from '../data/dummyData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    // Initialize from localStorage or fallback to dummy data
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('shop_items');
        return savedItems ? JSON.parse(savedItems) : DUMMY_ITEMS;
    });

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('shop_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('shop_items', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem('shop_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (item) => {
        // Generate a new ID based on the highest existing ID + 1
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { ...item, id: newId }]);
    };

    const updateItem = (updatedItem) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const addToCart = (item) => {
        setCartItems(prev => [...prev, item]);
    };

    const removeFromCart = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const deleteCategory = (categoryName) => {
        setItems(prev => prev.filter(item => item.category !== categoryName));
    };

    return (
        <DataContext.Provider value={{ items, addItem, updateItem, deleteItem, cartItems, addToCart, removeFromCart, clearCart, deleteCategory }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
