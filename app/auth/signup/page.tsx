'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signUp } from '@/lib/auth-actions';

export default function SignUpPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const confirm = formData.get('confirm') as string;

        if (password !== confirm) {
            setError('パスワードが一致しません');
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            setError('パスワードは8文字以上で設定してください');
            setLoading(false);
            return;
        }

        const result = await signUp(formData);
        if (result?.error) {
            setError(result.error);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 px-5 pt-14 pb-8 text-center">
                <div className="text-4xl mb-3">🐾</div>
                <h1 className="text-2xl font-extrabold text-white">はじめまして！</h1>
                <p className="text-white/70 text-sm mt-1">アカウントを作成して始めましょう</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="h-0.5 w-10 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">2</div>
                <div className="h-0.5 w-10 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">3</div>
            </div>

            {/* Form */}
            <div className="flex-1 px-5 py-2">
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
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">パスワード <span className="text-gray-300 font-normal">（8文字以上）</span></label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">パスワード（確認）</label>
                        <input
                            name="confirm"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-extrabold py-4 rounded-2xl text-base transition-colors mt-2"
                    >
                        {loading ? '登録中...' : '次へ →'}
                    </button>
                </form>

                <div className="text-center mt-6 pb-8">
                    <p className="text-sm text-gray-500">
                        すでにアカウントお持ちの方は{' '}
                        <Link href="/auth/login" className="text-emerald-600 font-bold">ログイン</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
