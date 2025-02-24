"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
    isAuthenticated: boolean | null;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    fetchWithAuth: (url: string, options: RequestInit) => Promise<Response>;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: null,
    signIn: async () => {},
    signOut: () => {},
    fetchWithAuth: async () => new Response(),
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children } : AuthProviderProps) {
    console.log('AuthProvider render');
    let i = 0; 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        console.log("AuthProvider isAuthenticated");

        // if (isAuthenticated === null) {
            const token = localStorage.getItem('token');
            // console.log('useEffect in AuthProvider', token);
            if (token) {
                // console.log('isAuthenticated');
                setIsAuthenticated(true);
            }
        // }
    }, [isAuthenticated]);

    useEffect(() => {
        console.log("AuthProvider mounted");
    }, []);

    const signIn = useCallback(async (username: string, password: string) => {
        console.log(i);
        i++;
        router.push('/');

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);
        const token = data.token;

        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }, [router, i]);

    const signOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/signin');
    };

    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        const response = await fetch(url, options);
        return response;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};