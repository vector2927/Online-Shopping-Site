import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Rocket, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartItems } = useData();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <Rocket className="logo-icon" />
                    <span>Gloria</span>
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-links desktop-only">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Categories</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/contact" className="nav-link">Contact Us</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="nav-link admin-link">Admin</Link>
                    )}
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="user-name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</span>
                            <button onClick={handleLogout} className="btn-icon" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', gap: '0.5rem' }}>
                            <LogIn size={16} />
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="cart-btn" aria-label="Cart">
                        <ShoppingCart size={24} />
                        <span className="cart-badge">{cartItems.length}</span>
                    </Link>

                    <button
                        className="menu-btn mobile-only"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Categories</Link>
                    <Link to="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About Us</Link>
                    <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact Us</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Admin</Link>
                    )}
                    {!user && (
                        <Link to="/login" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                    {user && (
                        <button className="mobile-nav-link" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }} onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
