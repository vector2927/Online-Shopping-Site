import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X } from 'lucide-react';

const Home = () => {
    const { items, addToCart } = useData();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(null); // Stores item name for confirmation

    // Extract unique categories for potential future filtering
    const categories = [...new Set(items.map(item => item.category))];

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <header style={{ textAlign: 'center', margin: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                    Welcome to Gloria
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Your Premium Site for everything you need.
                </p>
            </header>

            <section>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }}>New Arrivals</h2>

                {/* Items Grid */}
                <div className="responsive-grid">
                    {items
                        .filter(item => item.name && item.price > 0) // Filter out incomplete or placeholder items
                        .map((item) => (
                            <div
                                key={item.id}
                                className="card"
                                onClick={() => setSelectedItem(item)}
                                style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <div className="item-card-image">
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="hover-zoom" />
                                </div>
                                <div className="item-content">
                                    <h3 className="item-title">{item.name}</h3>
                                    <p className="item-desc">
                                        {item.description.substring(0, 60)}...
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span className="item-price">{item.price.toLocaleString()} MMK</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: '#f1f5f9', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Item Detail Modal for Users */}
            {selectedItem && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div className="card" style={{
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '0',
                        backgroundColor: 'var(--surface)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setSelectedItem(null)}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', boxShadow: 'var(--shadow-md)', cursor: 'pointer', zIndex: 10 }}
                            >
                                <X size={24} />
                            </button>
                            <div style={{ height: '300px', backgroundColor: '#f1f5f9' }}>
                                <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{selectedItem.name}</h2>
                                    <span style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', backgroundColor: '#f1f5f9', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                                        {selectedItem.category}
                                    </span>
                                </div>
                                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>{selectedItem.price.toLocaleString()} MMK</span>
                            </div>

                            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '2rem' }}>
                                {selectedItem.description}
                            </p>

                            <button
                                className="btn btn-accent"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                onClick={() => {
                                    addToCart(selectedItem);
                                    setShowConfirmation(selectedItem.name);
                                    setSelectedItem(null);
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1100,
                    padding: '1rem'
                }}>
                    <div className="card" style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '2rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Success!</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{showConfirmation}</span> has been added to the cart.
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => setShowConfirmation(null)}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes popIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Home;
