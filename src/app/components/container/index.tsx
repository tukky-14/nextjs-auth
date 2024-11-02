'use client';
import { getCurrentUser } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

const AuthContainer: React.FC<ContainerProps> = ({ children }) => {
    const router = useRouter();
    if (!getCurrentUser()) {
        router.push('/');
    }

    if (!getCurrentUser()) {
        return <div>Loading...</div>;
    }

    return <div>{children}</div>;
};

export default AuthContainer;
