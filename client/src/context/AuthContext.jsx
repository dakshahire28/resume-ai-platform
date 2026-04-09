import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ _id: 'guest_id', name: 'Guest User', email: 'guest@careerpilot.io' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auth check disabled for public access
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // const storedToken = localStorage.getItem('token');
    // if (storedUser && storedToken) {
    //   setUser(JSON.parse(storedUser));
    // }
    setLoading(false);
  }, []);

  // Register
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
      setUser({ _id: data._id, name: data.name, email: data.email });
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
      setUser({ _id: data._id, name: data.name, email: data.email });
      return true;
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || `Login failed: ${err.message}`;
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
