'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail } from './lib/auth';
import { useAuthRedirect } from './hooks/use-auth-redirect';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const { loading } = useAuthRedirect('/home', true);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await loginWithEmail(email, password);
            router.push('/home');
        } catch (err) {
            setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
            console.error(err); // コンソールでエラーを確認
        }
    };

    if (loading) return <p>読み込み中...</p>;

    return (
        <div className="flex h-screen items-center justify-center bg-gray-200 text-gray-700">
            <div className="w-96 rounded bg-white p-8 shadow-md">
                <h1 className="mt-4 text-center text-xl font-bold">ログイン</h1>
                <form className="mt-4">
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold">メールアドレス</label>
                        <input
                            type="email"
                            className="w-full rounded border border-gray-300 p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold">パスワード</label>
                        <input
                            type="password"
                            className="w-full rounded border border-gray-300 p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="mb-4 text-center text-sm font-bold text-red-500">{error}</p>}
                    <button
                        className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={handleClick}
                    >
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
}
