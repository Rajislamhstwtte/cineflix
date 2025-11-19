import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { WatchlistItem, ContentType } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, type: ContentType) => void;
  isInWatchlist: (id: number, type: ContentType) => boolean;
  loading: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const GUEST_WATCHLIST_KEY = 'cineflix-guest-watchlist';

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncWatchlist = async (firebaseUser: firebase.User | null) => {
      setLoading(true);
      if (firebaseUser) {
        // User is logged in, sync with Firestore
        const userDocRef = db.collection('users').doc(firebaseUser.uid);
        
        const unsubscribe = userDocRef.onSnapshot(async (doc) => {
          let cloudWatchlist: WatchlistItem[] = [];
          if (doc.exists) {
            cloudWatchlist = doc.data()?.watchlist || [];
          }

          // Check for a local guest watchlist to merge
          const localWatchlistStr = localStorage.getItem(GUEST_WATCHLIST_KEY);
          if (localWatchlistStr) {
            const localWatchlist: WatchlistItem[] = JSON.parse(localWatchlistStr);
            // Merge local and cloud, avoiding duplicates
            const combined = [...cloudWatchlist];
            localWatchlist.forEach(localItem => {
              if (!cloudWatchlist.some(cloudItem => cloudItem.id === localItem.id && cloudItem.type === localItem.type)) {
                combined.push(localItem);
              }
            });
            
            // Update Firestore with merged list and clear local storage
            await userDocRef.set({ watchlist: combined }, { merge: true });
            localStorage.removeItem(GUEST_WATCHLIST_KEY);
            setWatchlist(combined);
          } else {
            setWatchlist(cloudWatchlist);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      } else {
        // User is a guest, use local storage
        try {
          const storedWatchlist = localStorage.getItem(GUEST_WATCHLIST_KEY);
          setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
        } catch (error) {
          console.error("Failed to parse guest watchlist from localStorage", error);
          setWatchlist([]);
        }
        setLoading(false);
      }
    };

    syncWatchlist(user);

  }, [user]);

  const updateWatchlist = async (newWatchlist: WatchlistItem[]) => {
    setWatchlist(newWatchlist);
    if (user) {
      await db.collection('users').doc(user.uid).set({ watchlist: newWatchlist });
    } else {
      localStorage.setItem(GUEST_WATCHLIST_KEY, JSON.stringify(newWatchlist));
    }
  };

  const addToWatchlist = (item: WatchlistItem) => {
    updateWatchlist([...watchlist, item]);
  };

  const removeFromWatchlist = (id: number, type: ContentType) => {
    const newWatchlist = watchlist.filter(item => !(item.id === id && item.type === type));
    updateWatchlist(newWatchlist);
  };

  const isInWatchlist = (id: number, type: ContentType) => {
    return watchlist.some(item => item.id === id && item.type === type);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, loading }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};