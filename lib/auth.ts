import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import type { User } from '../types/models';

const SESSION_KEY = '@aiken_session_v1';
const AUTO_LOGOUT_MS = Number(process.env.AUTO_LOGOUT_MS || 1800000); // default 30min

type Session = { token: string | null; user: User | null };

type SessionContextValue = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshActivity: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (raw) setSession(JSON.parse(raw));
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    // whenever session changes, persist and reset inactivity timer
    (async () => {
      if (session) {
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        await AsyncStorage.removeItem(SESSION_KEY);
      }
    })();
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function resetTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (session) {
      timerRef.current = setTimeout(() => {
        // auto logout on inactivity
        void signOut();
      }, AUTO_LOGOUT_MS);
    }
  }

  const refreshActivity = () => {
    resetTimer();
  };

  const signIn = async (email: string, password: string) => {
    // call mock server
    const res = await api.post('/auth/login', { email, password });
    const payload = res.data;
    const s: Session = { token: payload.token, user: payload.user };
    setSession(s);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/signup', { name, email, password });
    const payload = res.data;
    const s: Session = { token: payload.token, user: payload.user };
    setSession(s);
  };

  const signOut = async () => {
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, loading, signIn, signUp, signOut, refreshActivity }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};
