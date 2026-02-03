import React from 'react';
import { Package, Tag, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside style={{
            width: '250px',
            backgroundColor: 'var(--surface)',
            borderRight: '1px solid var(--border)',
            height: 'calc(100vh - 64px)', // Subtract navbar height
            position: 'fixed',
            top: '64px',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', paddingLeft: '0.75rem' }}>Dashboard</h2>
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
