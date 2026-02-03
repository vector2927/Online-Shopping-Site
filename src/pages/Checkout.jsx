import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ScanLine } from 'lucide-react';

const Checkout = () => {
    const { cartItems, clearCart } = useData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate processing
        alert(`Order Placed Successfully!\nTotal: $${total.toFixed(2)}\nThank you via ${formData.email}`);
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h1>Your cart is empty</h1>
                <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '3rem' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem', alignItems: 'start' }} className="checkout-layout">
                {/* Shipping Form */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={24} color="var(--accent)" /> Shipping & Payment
                    </h2>
                    <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>First Name</span>
                                <input type="text" name="firstName" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Last Name</span>
                                <input type="text" name="lastName" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                        </div>

                        <label>
                            <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</span>
                            <input type="email" name="email" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                        </label>

                        <label>
                            <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Street Address</span>
                            <input type="text" name="address" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                        </label>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>City</span>
                                <input type="text" name="city" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>ZIP Code</span>
                                <input type="text" name="zip" required onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ScanLine size={24} /> Payment
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    {/* QR Code Placeholder with Real Image */}
                                    <div style={{ width: '200px', height: '200px', backgroundColor: '#f1f5f9' }}>
                                        <img
                                            src="/payment_qr_code_1770120184324.png"
                                            alt="Payment QR Code"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>Name : Penelope</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '0.05em' }}>Phone : #####1234</p>
                                    </div>
                                </div>

                                <div style={{ width: '100%', borderTop: '1px dashed var(--border)', paddingTop: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
                                        Upload Payment Screenshot
                                        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                            Please attach your transaction slip for verification.
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            backgroundColor: 'white',
                                            border: '2px dashed #cbd5e1',
                                            borderRadius: 'var(--radius)',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="card" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Order Summary</h2>
                    <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                        {cartItems.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '1rem 0' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button type="submit" form="checkout-form" className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1.1rem' }}>
                        Place Order
                    </button>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .checkout-layout { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default Checkout;
