'use client';
import { useAuthRedirect } from '@/app/hooks/use-auth-redirect';
import React from 'react';
import { logout } from '../../lib/auth';

const Home = () => {
    const { user, loading } = useAuthRedirect('/'); // 未ログイン時はログインページにリダイレクト

    const handleLogoutClick = () => {
        // ログアウト処理
        logout();
    };

    if (loading) return <p>読み込み中...</p>;

    return (
        <div className="flex h-screen items-center justify-center bg-gray-200">
            <div className="w-96 rounded bg-white p-8 text-gray-700 shadow-md">
                <h1>Home</h1>
                <p>ようこそ、{user?.email}さん</p>
                {/* ログアウト */}
                <button
                    className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    onClick={handleLogoutClick}
                >
                    ログアウト
                </button>
            </div>
        </div>
    );
};

export default Home;
