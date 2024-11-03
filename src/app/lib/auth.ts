import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
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

// ユーザーオブザーバーの型定義
export const observeUser = (setUser: (user: User | null) => void): void => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
};
