'use client';

import { useState } from 'react';
import { saveProfile } from '@/lib/auth-actions';

const SPECIES = [
    { value: 'dog', label: '🐕 犬' },
    { value: 'cat', label: '🐈 猫' },
    { value: 'small_animal', label: '🐇 小動物' },
    { value: 'other', label: '🐾 その他' },
];

export default function ProfileSetupPage() {
    const [selectedSpecies, setSelectedSpecies] = useState('dog');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.set('species', selectedSpecies);
        await saveProfile(formData);
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 px-5 pt-14 pb-8 text-center">
                <div className="text-4xl mb-3">🏠</div>
                <h1 className="text-2xl font-extrabold text-white">プロフィールを設定</h1>
                <p className="text-white/70 text-sm mt-1">ペットとあなたの情報を教えてください</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-8 h-8 rounded-full bg-emerald-700/30 flex items-center justify-center text-emerald-200 text-xs font-bold">✓</div>
                <div className="h-0.5 w-10 bg-emerald-500" />
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">2</div>
                <div className="h-0.5 w-10 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">3</div>
            </div>

            {/* Form */}
            <div className="flex-1 px-5 py-2 pb-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Owner section */}
                    <div>
                        <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">あなたの情報</h2>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">お名前</label>
                                <input
                                    name="display_name"
                                    type="text"
                                    required
                                    placeholder="例: 田村 さくら"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">お住まいのエリア</label>
                                <input
                                    name="area"
                                    type="text"
                                    placeholder="例: 世田谷区"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pet section */}
                    <div>
                        <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">ペットの情報</h2>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">ペットの名前</label>
                                <input
                                    name="pet_name"
                                    type="text"
                                    placeholder="例: ポチ"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2">ペットの種類</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {SPECIES.map(s => (
                                        <button
                                            key={s.value}
                                            type="button"
                                            onClick={() => setSelectedSpecies(s.value)}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${selectedSpecies === s.value
                                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                                                }`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">ペットの年齢（歳）</label>
                                <input
                                    name="age"
                                    type="number"
                                    min="0"
                                    max="30"
                                    placeholder="例: 7"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-extrabold py-4 rounded-2xl text-base transition-colors mt-2"
                    >
                        {loading ? '保存中...' : '保存してはじめる 🐾'}
                    </button>
                </form>
            </div>
        </div>
    );
}
