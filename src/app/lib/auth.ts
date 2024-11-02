// lib/auth.ts
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from './firebase';

// 型定義
interface AuthError {
    code: string;
    message: string;
}

// Email/Passwordでサインイン
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // エラーがFirebaseのAuthエラーである場合、型を設定
        const authError = error as AuthError;
        throw new Error(authError.message);
    }
};

// サインアウト
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        const authError = error as AuthError;
        throw new Error(authError.message);
    }
};

// 現在のユーザーを取得する関数
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};
