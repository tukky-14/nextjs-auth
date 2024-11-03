'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useAuthRedirect = (redirectTo: string, redirectIfAuthenticated: boolean = false) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Firebaseの認証状態を監視
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // ユーザーが存在するかどうかに応じてリダイレクト
            if (redirectIfAuthenticated && currentUser) {
                router.push(redirectTo); // ログイン済みなら指定ページへ
            } else if (!redirectIfAuthenticated && !currentUser) {
                router.push(redirectTo); // 未ログインなら指定ページへ
            }
            setLoading(false);
        });

        return () => unsubscribe(); // クリーンアップ用の関数
    }, [redirectTo, redirectIfAuthenticated, router]);

    return { user, loading };
};
