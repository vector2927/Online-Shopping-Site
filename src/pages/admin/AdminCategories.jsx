import React, { useState } from 'react';
import { Tag, X, Edit2, Check, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminCategories = () => {
    const { items, addItem, deleteCategory } = useData();
    const categories = [...new Set(items.map(item => item.category))];

    // State
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        const newItem = {
            id: Date.now(),
            name: "New " + newCategoryName + " Item",
            price: 0,
            category: newCategoryName,
            description: "Placeholder item for new category.",
            image: "https://via.placeholder.com/150"
        };
        addItem(newItem);
        setNewCategoryName('');
        setIsModalOpen(false);
        alert(`Category "${newCategoryName}" created!`);
    };

    const handleDeleteCategory = (category) => {
        if (confirm(`Are you sure you want to delete category "${category}"? This will delete ALL items in this category.`)) {
            deleteCategory(category);
        }
    };

    return (
        <div style={{ padding: '0' }}>
            <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Manage Categories</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`btn ${isEditing ? 'btn-primary' : 'btn-accent'}`}
                    style={{ gap: '0.5rem' }}
                >
                    {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                    {isEditing ? 'Done Editing' : 'Edit Categories'}
                </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {categories.map((category, index) => (
                    <div key={index} className="card category-card" style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        minWidth: '180px',
                        position: 'relative',
                        animation: isEditing ? 'shake 0.5s infinite' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Tag size={20} color="var(--accent)" />
                            <span style={{ fontWeight: 500 }}>{category}</span>
                        </div>

                        {isEditing && (
                            <button
                                onClick={() => handleDeleteCategory(category)}
                                style={{
                                    background: '#fee2e2',
                                    color: '#ef4444',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '0.25rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}

                {/* Add New Category Button */}
                {!isEditing && (
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="card"
                        style={{
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            minWidth: '150px',
                            border: '2px dashed var(--border)',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            transition: 'all 0.2s',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Plus size={20} />
                        <span>Add New</span>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    opacity: isModalOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}>
                    <div className="card" style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '2rem',
                        transform: isModalOpen ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'transform 0.3s ease-in-out'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add Category</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="var(--text-muted)" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory}>
                            <label style={{ display: 'block', marginBottom: '1.5rem' }}>
                                <span style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category Name</span>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g. Sports, Gaming"
                                    autoFocus
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid var(--border)',
                                        outline: 'none'
                                    }}
                                />
                            </label>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn"
                                    style={{ border: '1px solid var(--border)' }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes shake {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(1deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(-1deg); }
                    100% { transform: rotate(0deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminCategories;
