import AuthContainer from '@/app/components/container';
import React from 'react';

const Home = () => {
    return (
        <AuthContainer>
            <div className="flex h-screen items-center justify-center bg-gray-200">
                <div className="w-96 rounded bg-white p-8 text-gray-700 shadow-md">
                    <h1>Home</h1>
                </div>
            </div>
        </AuthContainer>
    );
};

export default Home;
