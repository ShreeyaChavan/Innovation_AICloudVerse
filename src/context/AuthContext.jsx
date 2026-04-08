import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username: email, password });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return { success: true };
      }
      return { success: false, message: 'Sign in incomplete' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
