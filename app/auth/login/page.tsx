'use client';

import Link from 'next/link';
import { useState } from 'react';
import { login } from '@/lib/auth-actions';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const result = await login(formData);
        if (result?.error) {
            setError(result.error === 'Invalid login credentials'
                ? 'メールアドレスまたはパスワードが間違っています'
                : result.error
            );
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 px-5 pt-14 pb-8 text-center">
                <div className="text-4xl mb-3">🐾</div>
                <h1 className="text-2xl font-extrabold text-white">おかえりなさい</h1>
                <p className="text-white/70 text-sm mt-1">ログインしてMateを探しましょう</p>
            </div>

            {/* Form */}
            <div className="flex-1 px-5 py-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">メールアドレス</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">パスワード</label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                    </div>

                    <Link href="/auth/reset" className="text-xs text-emerald-600 text-right -mt-2">
                        パスワードを忘れた方はこちら
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-extrabold py-4 rounded-2xl text-base transition-colors mt-2"
                    >
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        アカウントをお持ちでない方は{' '}
                        <Link href="/auth/signup" className="text-emerald-600 font-bold">新規登録</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
