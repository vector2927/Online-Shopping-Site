import React from 'react';
import { Package, Tag, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            {/* Mobile Close Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', paddingLeft: '0.75rem', margin: 0 }}>Dashboard</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        display: 'none' // Hidden by default, shown in media query via logic if needed, but here we can just leave it inline or manage via CSS.
                        // Ideally, we'd use a class, but for a quick fix let's rely on CSS to show/hide if we added a class.
                        // Actually let's just make it visible only on mobile via CSS if we added a class, or just show it if isOpen?
                        // "isOpen" is true mostly on mobile.
                    }}
                    className="mobile-close-btn" // We need to add this class to CSS if we want to toggle visibility strict
                >
                    {/* Reuse CSS from Admin.css media query to show this only on mobile */}
                </button>
                {/* Let's just add the close button explicitly for mobile. */}
                {isOpen && (
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                )}
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <button
                    onClick={() => setActiveTab('items')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: activeTab === 'items' ? 'var(--background)' : 'transparent',
                        color: activeTab === 'items' ? 'var(--accent)' : 'var(--text-muted)',
                        fontWeight: 500,
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    <Package size={20} />
                    Items
                </button>

                <button
                    onClick={() => setActiveTab('categories')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: activeTab === 'categories' ? 'var(--background)' : 'transparent',
                        color: activeTab === 'categories' ? 'var(--accent)' : 'var(--text-muted)',
                        fontWeight: 500,
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    <Tag size={20} />
                    Categories
                </button>
            </nav>

            <button
                onClick={handleLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    color: '#ef4444',
                    marginTop: 'auto',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    width: '100%'
                }}
            >
                <LogOut size={20} />
                Exit Admin
            </button>
        </aside>
    );
};

export default AdminSidebar;
