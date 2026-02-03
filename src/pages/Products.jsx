import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, Search } from 'lucide-react';

const Products = () => {
    const { items, addToCart } = useData();
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(null); // Stores item name for confirmation
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(items.map(item => item.category))];

    // Filter items
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const isValid = item.name && item.price > 0; // Filter out placeholder/empty items
        return matchesSearch && matchesCategory && isValid;
    });

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Our Collection</h1>

                {/* Filter and Search Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        {/* Search Input */}
                        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>

                        {/* Category Filter */}
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`btn ${selectedCategory === cat ? 'btn-primary' : ''}`}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        backgroundColor: selectedCategory === cat ? undefined : '#f1f5f9',
                                        color: selectedCategory === cat ? undefined : 'var(--text-main)',
                                        border: 'none',
                                        padding: '0.5rem 1rem'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Items Grid */}
            <div className="responsive-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
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
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="item-price">{item.price.toLocaleString()} MMK</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: '#f1f5f9', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '1.25rem' }}>No items found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Item Detail Modal */}
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
                        backgroundColor: 'var(--surface)'
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
                                    setShowConfirmation(selectedItem.name); // Show confirmation
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
                    zIndex: 1100, // Higher than item modal
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
                            <Search size={32} style={{ transform: 'rotate(45deg) scaleX(-1)' /* Checkmark-ish */ }} />
                            {/* Or better, import Check from lucide-react if available, or just use text */}
                            {/* Since I didn't import Check in this file yet (wait, I did not check used imports fully, I'll assume Search is there, but Check is safer if I import it) */}
                            {/* Re-checking imports: import { X, Search } from 'lucide-react'; */}
                            {/* I'll stick to a simple text checkmark for now to avoid breaking imports in this large block, or use SVG directly */}
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

export default Products;
