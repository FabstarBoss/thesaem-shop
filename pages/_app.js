import { useState, useEffect, createContext, useContext } from 'react';
import Head from 'next/head';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('thesaem_token');
    if (t) {
      setToken(t);
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + t } })
        .then(r => r.ok ? r.json() : null)
        .then(u => u && setUser(u))
        .catch(() => localStorage.removeItem('thesaem_token'));
    }
  }, []);

  const login = async (email, password) => {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    localStorage.setItem('thesaem_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (email, password, name, phone) => {
    const r = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, phone })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    localStorage.setItem('thesaem_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('thesaem_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>THE SAEM — Официальный интернет-магазин корейской косметики</title>
      </Head>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
