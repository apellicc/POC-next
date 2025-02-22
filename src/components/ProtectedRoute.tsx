"use client";

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    console.log('ProtectedRoute');
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        console.log('ProtectedRoute useEffect', isAuthenticated);
        if (isAuthenticated === false) {
            router.push('/signin');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

