import React from 'react';
import { useData } from '../context/DataContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useData();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Shopping Cart</h1>
                <p style={{ color: 'var(--text-muted)' }}>{cartItems.length} Items in your cart</p>
            </header>

            {cartItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', lg: { flexDirection: 'row' } }} className="cart-layout">
                    {/* Items List */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {cartItems.map((item, index) => (
                            <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '1.5rem' }}>
                                <div style={{ width: '100px', height: '100px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.category}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.price.toLocaleString()} MMK</div>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Order Summary</h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                <span>Subtotal</span>
                                <span>{subtotal.toLocaleString()} MMK</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                <span>Tax (10%)</span>
                                <span>{tax.toLocaleString()} MMK</span>
                            </div>
                            <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '1.5rem 0' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                <span>Total</span>
                                <span>{total.toLocaleString()} MMK</span>
                            </div>

                            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1rem', textDecoration: 'none' }}>
                                Proceed to Checkout <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Your cart is empty.</p>
                    <Link to="/products" className="btn btn-primary" style={{ display: 'inline-flex' }}>Start Shopping</Link>
                </div>
            )}

            {/* CSS for responsive layout */}
            <style>{`
        .cart-layout {
           display: flex;
           flex-direction: column;
        }
        @media (min-width: 1024px) {
           .cart-layout {
             flex-direction: row;
           }
        }
      `}</style>
        </div>
    );
};

export default Cart;
