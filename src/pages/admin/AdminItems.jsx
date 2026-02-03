import React, { useState } from 'react';
import { Edit2, X, Save, Trash2, Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminItems = () => {
    const { items, updateItem, deleteItem, addItem } = useData();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [editForm, setEditForm] = useState({});

    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        setEditForm(item);
        setIsEditing(false);
    };

    const handleAddNew = () => {
        const newItem = {
            name: '',
            price: 0,
            category: '',
            description: '',
            image: ''
        };
        setSelectedItem(newItem);
        setEditForm(newItem);
        setIsEditing(true); // Directly edit mode
    };

    const handleCloseDetail = () => {
        setSelectedItem(null);
        setIsEditing(false);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset form to current item state if cancelling
        if (isEditing && selectedItem.id) setEditForm(selectedItem);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSave = () => {
        if (!editForm.name || !editForm.price) {
            alert("Name and Price are required!");
            return;
        }

        if (selectedItem.id) {
            updateItem(editForm);
        } else {
            addItem(editForm);
        }
        handleCloseDetail();
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this item?')) {
            deleteItem(selectedItem.id);
            handleCloseDetail();
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Manage Items</h1>
                <button onClick={handleAddNew} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                    <Plus size={18} /> Add New Item
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1.5rem'
            }}>
                {items.map(item => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => handleOpenDetail(item)}
                        style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ height: '160px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.name}</h3>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{item.price.toLocaleString()} MMK</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
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
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '0',
                        backgroundColor: 'var(--surface)'
                    }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem' }}>{isEditing ? 'Edit Item' : 'Item Details'}</h2>
                            <button onClick={handleCloseDetail} style={{ background: 'none', color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            {/* Image Preview */}
                            <div style={{ height: '240px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                <img
                                    src={(isEditing ? editForm.image : selectedItem.image) || 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt="Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <label>
                                        <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Name</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                        />
                                    </label>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <label>
                                            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Price (MMK)</span>
                                            <input
                                                type="number"
                                                name="price"
                                                step="0.01"
                                                value={editForm.price}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                            />
                                        </label>
                                        <label>
                                            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Category</span>
                                            <input
                                                type="text"
                                                name="category"
                                                value={editForm.category}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                            />
                                        </label>
                                    </div>

                                    <label>
                                        <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Description</span>
                                        <textarea
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                        />
                                    </label>

                                    <label>
                                        <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Image URL</span>
                                        <input
                                            type="text"
                                            name="image"
                                            value={editForm.image}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedItem.name}</h3>
                                            <span style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                {selectedItem.category}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{selectedItem.price.toLocaleString()} MMK</span>
                                    </div>
                                    <p style={{ lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '2rem' }}>
                                        {selectedItem.description}
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                            {isEditing ? (
                                <>
                                    <button className="btn" onClick={handleEditToggle} style={{ border: '1px solid var(--border)' }}>Cancel</button>
                                    <button className="btn btn-primary" onClick={handleSave} style={{ gap: '0.5rem' }}>
                                        <Save size={18} /> Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn" style={{ color: '#ef4444', border: '1px solid #fee2e2', backgroundColor: '#fef2f2' }} onClick={handleDelete}>
                                        <Trash2 size={18} style={{ marginRight: '0.5rem' }} /> Delete
                                    </button>
                                    <button className="btn btn-accent" onClick={handleEditToggle} style={{ gap: '0.5rem' }}>
                                        <Edit2 size={18} /> Edit Item
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminItems;
