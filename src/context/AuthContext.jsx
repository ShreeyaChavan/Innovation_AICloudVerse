import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signIn, signOut, confirmSignIn, fetchUserAttributes, clearCredentials } from 'aws-amplify/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserEmail, setPendingUserEmail] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      const attributes = await fetchUserAttributes();
      setUserEmail(attributes.email);
    } catch (err) {
      setUser(null);
      setUserEmail(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const signInResult = await signIn({ username, password });
      
      if (signInResult.isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        const attributes = await fetchUserAttributes();
        setUserEmail(attributes.email);
        return { success: true };
      }
      
      if (signInResult.nextStep?.signInStep === 'NEW_PASSWORD_REQUIRED') {
        setPendingUserEmail(username);
        return { 
          success: false, 
          requiresNewPassword: true,
          message: 'Password reset required'
        };
      }
      
      return { success: false, message: 'Sign in failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  const completeNewPassword = async (newPassword) => {
    try {
      const result = await confirmSignIn({ challengeResponse: newPassword });
      if (result.isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        const attributes = await fetchUserAttributes();
        setUserEmail(attributes.email);
        setPendingUserEmail(null); // clear pending email
        return { success: true };
      }
      return { success: false, message: 'Failed to set new password' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Helper to clear all Amplify storage
  const clearAmplifyStorage = () => {
    // Clear localStorage keys used by Amplify
    const amplifyKeys = [
      'amplify-datastore',
      'amplify-auth-data',
      'aws-amplify-federatedInfo',
      'aws-amplify-auth-container',
      'aws-amplify-auth-user'
    ];
    amplifyKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    // Attempt to clear IndexedDB (optional, but safe)
    indexedDB.deleteDatabase('amplify-datastore');
    indexedDB.deleteDatabase('aws-amplify-auth');
  };

  const logout = async () => {
    try {
      // Global sign out invalidates tokens across devices
      await signOut({ global: true });
      // Clear Amplify's local storage and credentials
      await clearCredentials();
      clearAmplifyStorage();
    } catch (error) {
      console.error('Logout error:', error);
    }
    // Clear React state
    setUser(null);
    setUserEmail(null);
    setPendingUserEmail(null);
    // Clear demo user storage
    localStorage.removeItem('crisisUser');
    sessionStorage.clear();
    // Optional: hard redirect to login page to reset everything
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, userEmail, loading, login, logout,
      pendingUserEmail, completeNewPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
