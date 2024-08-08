"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from '@/services/firebase/auth/auth_service';
interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        Cookies.set('userId', user.uid, { expires: 7 });
      } else {
        setUserId(null);
        Cookies.remove('userId');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
