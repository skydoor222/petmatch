'use client';

import Link from 'next/link';
import { useState } from 'react';
import { requestPasswordReset } from '@/lib/auth-actions';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ResetPage() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const result = await requestPasswordReset(formData);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-orange-600 px-5 pt-14 pb-8 text-center relative">
                <Link href="/auth/login" className="absolute left-5 top-14 text-white/80">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-white">パスワード再設定</h1>
                <p className="text-white/70 text-sm mt-1">登録済みのメールアドレスを入力してください</p>
            </div>

            {/* Content */}
            <div className="flex-1 px-5 py-8">
                {success ? (
                    <div className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-xl font-heading text-gray-900 mb-4">メールを送信しました</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            パスワード再設定用のリンクをメールで送信しました。メールの内容を確認して手続きを完了させてください。
                        </p>
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center justify-center w-full bg-orange-600 text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-orange-900/10 active:scale-95 transition-all"
                        >
                            ログイン画面に戻る
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-[2rem] p-6 card-shadow border border-gray-100">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">メールアドレス</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white focus:border-orange-200 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-heading py-5 rounded-[2rem] text-lg shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all"
                        >
                            {loading ? '送信中...' : '再設定用リンクを送信'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
