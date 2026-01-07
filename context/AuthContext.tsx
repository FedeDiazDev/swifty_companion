import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { exchangeCodeForToken } from '@/services/authService';
import { useRouter, useSegments } from 'expo-router';
import api, { onTokenUpdate } from '@/services/api';
import { User } from '@/types/user';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (code: string) => Promise<void>;
    signOut: () => Promise<void>;
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const TOKEN_KEY = 'swifty_access_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
                if (storedToken) {
                    await api.get('/me');
                    setAccessToken(storedToken);
                }
            } catch (e) {
                console.error("Failed to load token", e);
                await SecureStore.deleteItemAsync(TOKEN_KEY);
                await SecureStore.deleteItemAsync('swifty_refresh_token');
                setAccessToken(null);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

    useEffect(() => {
        const unsubscribe = onTokenUpdate((token) => {
            setAccessToken(token);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = (segments as string[])[0] === '(app)';
        const inLoginGroup = (segments as string[])[0] === '(auth)';

        if (!accessToken && inAuthGroup) {
            router.replace('/login' as any);
        } else if (accessToken && inLoginGroup) {
            router.replace('/search');
        }
    }, [accessToken, segments, isLoading]);


    const REFRESH_TOKEN_KEY = 'swifty_refresh_token';

    const signIn = async (code: string) => {
        setIsLoading(true);
        try {
            const tokenData = await exchangeCodeForToken(code);
            const token = tokenData.access_token;

            await SecureStore.setItemAsync(TOKEN_KEY, token);
            if (tokenData.refresh_token) {
                await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenData.refresh_token);
            }
            setAccessToken(token);
        } catch (error) {
            console.error("Sign in failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            setAccessToken(null);
            setUser(null);
        } catch (error) {
            console.error("Sign out failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
