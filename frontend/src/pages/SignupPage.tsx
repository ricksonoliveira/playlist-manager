import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { GoogleIcon, SpotifyIcon } from '../components/Icons';
import '../styles/spotify-theme.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.username.trim()) {
      return 'Username is required';
    }
    if (formData.username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log('Signup successful:', response.data);

      // Redirect to login page
      navigate('/login', {
        state: { message: 'Account created successfully! Please log in.' }
      });
    } catch (err: any) {
      console.error('Full signup error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      const errorMessage = err.response?.data?.error || err.response?.data?.detail || 'Signup failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#1e1e1e',
        border: '1px solid #282828',
        borderRadius: '16px',
        padding: '48px 32px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Logo/Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>
            🎵
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '8px',
          }}>
            Create Account
          </h1>
          <p style={{
            color: '#b3b3b3',
            fontSize: '14px',
          }}>
            Join Spotify Voice Manager
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#ff6b6b',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px',
            }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#282828',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1DB954';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 185, 84, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#404040';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px',
            }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#282828',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1DB954';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 185, 84, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#404040';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#282828',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1DB954';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 185, 84, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#404040';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px',
            }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#282828',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1DB954';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 185, 84, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#404040';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: loading ? '#7f7f7f' : '#1DB954',
              color: loading ? '#b3b3b3' : '#000000',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#1ed760';
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#1DB954';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#404040' }}></div>
          <span style={{ color: '#b3b3b3', fontSize: '12px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#404040' }}></div>
        </div>

        {/* OAuth Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Google Signup Button */}
          <button
            type="button"
            onClick={() => console.log('Google signup clicked')}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: '#ffffff',
              color: '#3c4043',
              border: '1px solid #dadce0',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <GoogleIcon size={20} />
            Continue with Google
          </button>

          {/* Spotify Signup Button */}
          <button
            type="button"
            onClick={() => console.log('Spotify signup clicked')}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: '#1DB954',
              color: '#000000',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1ed760';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1DB954';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <SpotifyIcon size={20} />
            Continue with Spotify
          </button>
        </div>

        {/* Login Link */}
        <p style={{
          textAlign: 'center',
          color: '#b3b3b3',
          fontSize: '14px',
          marginTop: '24px',
        }}>
          Already have an account?{' '}
          <a href="/login" style={{
            color: '#1DB954',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.3s ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1ed760'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#1DB954'}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

