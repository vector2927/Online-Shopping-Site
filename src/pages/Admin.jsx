import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './admin/AdminSidebar';
import AdminItems from './admin/AdminItems';
import AdminCategories from './admin/AdminCategories';
import './admin/Admin.css';

const Admin = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('items');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Protect the route
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-container">
            {/* Overlay for mobile when sidebar is open */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="admin-content">
                {activeTab === 'items' ? <AdminItems /> : <AdminCategories />}
            </main>

            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>
        </div>
    );
};

export default Admin;
