import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signIn, signOut, confirmSignIn } from 'aws-amplify/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserEmail, setPendingUserEmail] = useState(null);

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
      const signInResult = await signIn({ username: email, password });
      
      // If user is signed in immediately
      if (signInResult.isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return { success: true };
      }
      
      // Check if password reset is required
      if (signInResult.nextStep?.signInStep === 'NEW_PASSWORD_REQUIRED') {
        // Store the user email and return special status
        setPendingUserEmail(email);
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
        setPendingUserEmail(null);
        return { success: true };
      }
      return { success: false, message: 'Failed to set new password' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, logout,
      pendingUserEmail, completeNewPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
