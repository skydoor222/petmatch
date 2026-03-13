'use client';

import Link from 'next/link';
import { Pet } from '@/lib/types';
import { MapPin, Heart, Clock } from 'lucide-react';

interface Props { pet: Pet; }

export default function PetCard({ pet }: Props) {
    return (
        <Link href={`/pets/${pet.id}`} className="group relative block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100/50 text-left">
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

                {/* Wishlist Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 glass rounded-xl flex items-center justify-center text-gray-900 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart size={14} className="group-hover:text-rose-500 transition-colors" />
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4 pt-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-black text-gray-900 truncate pr-2">
                        {pet.name}
                    </h3>
                    <div className="px-2 py-0.5 bg-gray-50 rounded-lg border border-gray-100 shrink-0">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tight">{pet.breed}</span>
                    </div>
                </div>

                {/* Specific Request Time - Replaces Hourly Rate */}
                <div className="flex items-center gap-1.5 py-1.5 px-3 bg-orange-50 rounded-xl border border-orange-100/50 mb-3">
                    <Clock size={12} className="text-orange-600" />
                    <span className="text-[11px] font-black text-orange-900">
                        {pet.requestDate || '12/24'} {pet.requestTime || '14:00〜'}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={10} className="text-orange-600 font-bold" />
                        <span className="text-[10px] font-black truncate max-w-[80px]">{pet.area?.split('・')[0] || '世田谷区'}</span>
                    </div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <span>{pet.distance || '2.0km'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
