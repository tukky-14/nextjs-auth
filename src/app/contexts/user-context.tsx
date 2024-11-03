'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { observeUser } from '../lib/auth';

interface UserContextType {
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // observeUserでユーザーの状態を監視
        const unsubscribe = observeUser(setUser);
        return unsubscribe; // クリーンアップ用の関数を返す
    }, []);

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
