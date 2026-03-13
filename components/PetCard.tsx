import Link from 'next/link';
import { Pet } from '@/lib/types';
import { MapPin, Heart, Sparkles } from 'lucide-react';

interface Props { pet: Pet; }

export default function PetCard({ pet }: Props) {
    return (
        <Link href={`/pets/${pet.id}`} className="group relative block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
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
                        <span className="text-[10px] font-black text-orange-900 uppercase tracking-wider">Seeking Care</span>
                    </div>
                )}

                {/* Category Icon Overlay */}
                <div className="absolute top-3 right-3 w-8 h-8 glass rounded-xl flex items-center justify-center text-gray-900 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart size={14} className="group-hover:text-rose-500 transition-colors" />
                </div>
            </div>

            {/* Info Overlay / Footer */}
            <div className="p-4 pt-3">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-black text-gray-900 truncate pr-2">
                        {pet.name}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter pt-0.5">
                        {pet.breed}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={10} className="text-orange-600" />
                        <span className="text-[10px] font-bold truncate max-w-[80px]">{pet.area.split('・')[0]}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        <span className="text-[10px] font-black text-gray-900">{pet.age}</span>
                    </div>
                </div>
            </div>

            {/* Price/Marketplace Label (Mercari style) */}
            <div className="absolute bottom-[88px] left-0 bg-orange-600 text-white text-[11px] font-black px-3 py-1.5 rounded-r-xl shadow-lg shadow-orange-900/10">
                Needs Care
            </div>
        </Link>
    );
}
