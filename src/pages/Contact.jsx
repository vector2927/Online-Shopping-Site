import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Get in Touch</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>We'd love to hear from you. Send us a message or visit us.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Contact Info */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--secondary)' }}>Contact Information</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '12px', color: 'var(--accent)' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Email Us</h3>
                                <p style={{ color: 'var(--text-muted)' }}>support@gloria.com</p>
                                <p style={{ color: 'var(--text-muted)' }}>info@gloria.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '12px', color: '#16a34a' }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Call Us</h3>
                                <p style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</p>
                                <p style={{ color: 'var(--text-muted)' }}>Mon-Fri, 9am - 6pm EST</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '12px', color: '#ea580c' }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Visit Us</h3>
                                <p style={{ color: 'var(--text-muted)' }}>123 Shopping Avenue</p>
                                <p style={{ color: 'var(--text-muted)' }}>New York, NY 10001</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>First Name</span>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                            <label>
                                <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Last Name</span>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                            </label>
                        </div>

                        <label>
                            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</span>
                            <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                        </label>

                        <label>
                            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</span>
                            <textarea rows={5} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontFamily: 'inherit' }}></textarea>
                        </label>

                        <button type="submit" className="btn btn-primary" style={{ padding: '1rem', justifyContent: 'center', fontSize: '1rem', gap: '0.5rem' }}>
                            {submitted ? 'Message Sent!' : (
                                <>
                                    <Send size={18} /> Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
