'use client';

import { useState } from 'react';
import { updatePassword } from '@/lib/auth-actions';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UpdatePasswordPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const confirm = formData.get('confirm_password') as string;

        if (password !== confirm) {
            setError('パスワードが一致しません');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('パスワードは6文字以上で入力してください');
            setLoading(false);
            return;
        }

        const result = await updatePassword(formData);
        if (result?.error) {
            setError(result.error);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-orange-600 px-5 pt-14 pb-8 text-center relative">
                <h1 className="text-2xl font-bold text-white">新しいパスワードの設定</h1>
                <p className="text-white/70 text-sm mt-1">セキュアなパスワードを入力してください</p>
            </div>

            {/* Content */}
            <div className="flex-1 px-5 py-8">
                <div className="max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-3">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">新しいパスワード</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white focus:border-orange-200 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">パスワード（確認）</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white focus:border-orange-200 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-heading py-5 rounded-[2rem] text-lg shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all"
                        >
                            {loading ? '更新中...' : 'パスワードを更新する'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
