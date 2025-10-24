import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/spotify-theme.css';

interface User {
  id: number;
  username: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/auth/me/');
        setUser(response.data);
      } catch (err: any) {
        setError('Failed to fetch user data');
        console.error('Error fetching user:', err);
        // Redirect to login if not authenticated
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout/');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      color: '#ffffff',
    }}>
      {/* Navbar */}
      <nav style={{
        background: '#121212',
        borderBottom: '1px solid #282828',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1DB954',
          }}>
            🎵 Spotify Voice Manager
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}>
            <span style={{
              color: '#b3b3b3',
              fontSize: '14px',
            }}>
              Welcome, <strong>{user?.username}</strong>!
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: '#e74c3c',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c0392b';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#e74c3c';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
      }}>
        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#ff6b6b',
          }}>
            {error}
          </div>
        )}

        <div style={{
          background: '#1e1e1e',
          border: '1px solid #282828',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '32px',
            color: '#ffffff',
          }}>
            Dashboard
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}>
            {/* User Info Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(29, 185, 84, 0.05) 100%)',
              border: '1px solid rgba(29, 185, 84, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1DB954';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(29, 185, 84, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(29, 185, 84, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#1DB954',
              }}>
                👤 User Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#b3b3b3',
                    marginBottom: '4px',
                  }}>
                    Username
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                    {user?.username}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#b3b3b3',
                    marginBottom: '4px',
                  }}>
                    Email
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.05) 100%)',
              border: '1px solid rgba(52, 152, 219, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3498db';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(52, 152, 219, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(52, 152, 219, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#3498db',
              }}>
                ⚡ Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#3498db',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2980b9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3498db';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View Playlists
                </button>
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#9b59b6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#8e44ad';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#9b59b6';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Create Playlist
                </button>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div style={{
            background: 'rgba(29, 185, 84, 0.1)',
            border: '1px solid rgba(29, 185, 84, 0.3)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#1ed760',
            }}>
              ✅ Authentication Working!
            </h3>
            <p style={{
              color: '#b3b3b3',
              fontSize: '14px',
              lineHeight: '1.6',
            }}>
              You have successfully logged in to the Spotify Voice Manager. The Django authentication system is working correctly with email-based login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

