import Link from 'next/link';
import { Pet } from '@/lib/types';
import { MapPin, Heart, Sparkles } from 'lucide-react';

interface Props { pet: Pet; }

export default function PetCard({ pet }: Props) {
    return (
        <Link href={`/pets/${pet.id}`} className="group relative block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100/50">
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                {pet.imageUrl ? (
                    <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-200">
                        <MapPin size={48} strokeWidth={1} />
                    </div>
                )}

                {/* Status Badge */}
                {pet.status === 'looking_for_mate' && (
                    <div className="absolute top-3 left-3 glass px-3 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black text-orange-900 uppercase tracking-wider">預かり先募集中</span>
                    </div>
                )}

                {/* Wishlist Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 glass rounded-xl flex items-center justify-center text-gray-900 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart size={14} className="group-hover:text-rose-500 transition-colors" />
                </div>

                {/* Service Badge (Bottom Left overlay) - Mercari Style */}
                <div className="absolute bottom-3 left-0 bg-orange-600/90 text-white text-[9px] font-black px-3 py-1.5 rounded-r-xl shadow-lg backdrop-blur-sm">
                    お迎え待ち
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4 pt-3">
                <div className="flex justify-between items-start mb-0.5">
                    <h3 className="text-sm font-black text-gray-900 truncate pr-2">
                        {pet.name}
                    </h3>
                    <div className="flex items-center gap-1 text-orange-600">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-black">{pet.trustScore?.avgRating || 5.0}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={10} className="text-orange-600" />
                        <span className="text-[10px] font-bold truncate max-w-[80px]">{pet.area.split('・')[0]}</span>
                    </div>
                    <div className="text-xs font-black text-gray-900">
                        ¥1,500<span className="text-[10px] text-gray-300">/hr</span>
                    </div>
                </div>

                {/* Detailed distance/age */}
                <div className="mt-2 text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span>{pet.age}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-100" />
                    <span>{pet.distance}</span>
                </div>
            </div>
        </Link>
    );
}

function Star({ size, fill, className }: { size: number, fill?: string, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill || "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
