'use client';

import Link from 'next/link';
import { CheckCircle2, Home, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewSuccessPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center bg-orange-50/30">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-32 h-32 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-orange-900/20 mb-10 relative"
            >
                <CheckCircle2 size={64} strokeWidth={2.5} />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -top-4 -right-4 bg-white text-orange-600 p-2 rounded-2xl shadow-lg border border-orange-50"
                >
                    <Sparkles size={24} />
                </motion.div>
            </motion.div>

            <h1 className="text-3xl font-heading text-gray-900 mb-4">取引が完了しました！</h1>
            <p className="text-gray-500 font-bold leading-relaxed mb-12 max-w-[280px]">
                心のこもった評価をありがとうございます。<br />
                あなたの声が、より良いコミュニティを支えます。
            </p>

            <div className="w-full max-w-xs space-y-4">
                <Link
                    href="/"
                    className="w-full h-16 rounded-[1.8rem] bg-gray-900 text-white font-bold flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-900/10"
                >
                    <Home size={18} />
                    <span>ホームに戻る</span>
                </Link>
                <Link
                    href="/messages"
                    className="w-full h-16 rounded-[1.8rem] bg-white text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-gray-50 border border-gray-100 transition-all active:scale-95"
                >
                    <MessageSquare size={18} />
                    <span>メッセージ一覧へ</span>
                </Link>
            </div>

            {/* Decorative BG element */}
            <div className="fixed -bottom-32 -left-32 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed -top-16 -right-16 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
