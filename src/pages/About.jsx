import React from 'react';
import { Rocket } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>About Us</h1>
                <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--accent)', margin: '0 auto' }}></div>
            </header>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4rem',
                flexWrap: 'wrap'
            }}>
                {/* Text Section - Takes up remaining space */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>Our Story</h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        Gloria was formed in 2023 with a singular vision: to redefine the online shopping experience.
                        What started as a small team of passionate innovators has grown into a premier destination for
                        quality products. We saw a gap in the market for a platform that combines luxury aesthetics
                        with everyday utility.
                    </p>

                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--secondary)', marginTop: '2.5rem' }}>Our Mission</h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        We aim for the ultimate convenience of our customers. We believe that shopping should be
                        seamless, intuitive, and enjoyable. Every feature of our site, from the curated product
                        selection to the secure checkout, is designed with you in mind. We are committed to
                        providing exceptional service and ensuring that every package that arrives at your doorstep
                        brings a smile.
                    </p>
                </div>

                {/* Logo Section - ~28% width */}
                <div style={{
                    flexBasis: '28%',
                    minWidth: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 0
                }}>
                    <div style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        backgroundColor: 'var(--primary)',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <Rocket size={120} strokeWidth={1.5} style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gloria</span>
                        <span style={{ fontSize: '1rem', opacity: 0.8, letterSpacing: '1px' }}>EST. 2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
