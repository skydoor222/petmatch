import Link from 'next/link';

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 flex flex-col relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-[-40px] right-[-30px] text-[220px] opacity-[0.06]">🐾</div>
                <div className="absolute bottom-[120px] left-[-40px] text-[160px] opacity-[0.05]">🐕</div>
            </div>

            {/* Top hero */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-20">
                <div className="text-6xl mb-6">🐾</div>
                <h1 className="text-3xl font-extrabold text-white leading-tight mb-3">
                    ペットに、もう一人の<br />相棒を見つけよう。
                </h1>
                <p className="text-white/70 text-base leading-relaxed">
                    信頼できるMateが、あなたの大切な家族を<br />安心してサポートします。
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 justify-center mt-8">
                    {['🐕 犬・猫対応', '💊 投薬OK', '🌙 深夜対応', '🏥 通院同伴'].map(tag => (
                        <span key={tag} className="bg-white/15 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-6 pb-12 flex flex-col gap-3">
                <Link
                    href="/auth/signup"
                    className="w-full bg-white text-emerald-800 font-extrabold text-base py-4 rounded-2xl text-center shadow-lg hover:bg-emerald-50 transition-colors active:scale-95"
                >
                    無料で始める
                </Link>
                <Link
                    href="/auth/login"
                    className="w-full bg-white/10 text-white font-bold text-base py-4 rounded-2xl text-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors active:scale-95"
                >
                    ログインはこちら
                </Link>
                <p className="text-white/40 text-xs text-center mt-2">
                    登録することで利用規約・プライバシーポリシーに同意したことになります
                </p>
            </div>
        </div>
    );
}
