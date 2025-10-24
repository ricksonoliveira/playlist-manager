import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { GoogleIcon, SpotifyIcon } from '../components/Icons';
import '../styles/spotify-theme.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login/', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
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
            Spotify Voice Manager
          </h1>
          <p style={{
            color: '#b3b3b3',
            fontSize: '14px',
          }}>
            Control your playlists with voice
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Login Button */}
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
            {loading ? 'Logging in...' : 'Log In'}
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
          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => console.log('Google login clicked')}
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

          {/* Spotify Login Button */}
          <button
            type="button"
            onClick={() => console.log('Spotify login clicked')}
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

        {/* Sign Up Link */}
        <p style={{
          textAlign: 'center',
          color: '#b3b3b3',
          fontSize: '14px',
          marginTop: '24px',
        }}>
          Don't have an account?{' '}
          <a href="/signup" style={{
            color: '#1DB954',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.3s ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1ed760'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#1DB954'}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

