import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

interface AuthContextType {
  user: firebase.User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<firebase.auth.UserCredential>;
  signUp: (email: string, pass: string) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = (email: string, pass: string) => {
    return auth.signInWithEmailAndPassword(email, pass);
  };

  const signUp = (email: string, pass: string) => {
    return auth.createUserWithEmailAndPassword(email, pass);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
