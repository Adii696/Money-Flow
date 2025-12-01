import React, { useState } from 'react';
import { login, register } from '../services/api';

const AuthForm = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      let data;
      if (mode === 'login') {
        data = await login({ email: form.email, password: form.password });
      } else {
        data = await register({
          name: form.name,
          email: form.email,
          password: form.password
        });
      }
      onAuthSuccess(data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => switchMode('login')}
        >
          Login
        </button>
        <button
          className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="form-row">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
        )}

        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
