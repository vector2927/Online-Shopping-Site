import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './admin/AdminSidebar';
import AdminItems from './admin/AdminItems';
import AdminCategories from './admin/AdminCategories';

const Admin = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('items');

    // Protect the route
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main style={{ marginLeft: '250px', minHeight: '100%' }}>
                {activeTab === 'items' ? <AdminItems /> : <AdminCategories />}
            </main>
        </div>
    );
};

export default Admin;
