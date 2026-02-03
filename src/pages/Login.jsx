import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        navigate(role === 'admin' ? '/admin' : '/');
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Welcome Back</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleLogin('user')}
                        style={{ padding: '1rem', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <User size={20} />
                        Login as User
                    </button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        — OR —
                    </div>

                    <button
                        className="btn btn-accent"
                        onClick={() => handleLogin('admin')}
                        style={{ padding: '1rem', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <ShieldCheck size={20} />
                        Login as Admin
                    </button>
                </div>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    (This is a demo login page. No password required.)
                </p>
            </div>
        </div>
    );
};

export default Login;
