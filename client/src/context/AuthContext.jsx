import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a session already exists via the HTTP-only cookie
  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify', { withCredentials: true });
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = async (credentials) => {
    const { data } = await axios.post('/api/auth/login', credentials, { withCredentials: true });
    setUser(data);
    return data;
  };

  const signup = async (userData) => {
    const { data } = await axios.post('/api/auth/signup', userData, { withCredentials: true });
    setUser(data);
    return data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
