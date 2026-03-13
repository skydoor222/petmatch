import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getMates() {
    const { data: mates, error } = await supabase
        .from('mates')
        .select(`
      *,
      services (*),
      reviews (*)
    `);

    if (error) throw error;

    return mates.map((mate: any) => ({
        ...mate,
        bgGradient: mate.bg_gradient,
        imageUrl: mate.image_url,
        availableDates: mate.available_dates,
        repeatCount: mate.repeat_count,
        isNew: mate.is_new,
        trustScore: mate.trust_score,
        services: mate.services.map((s: any) => ({
            type: s.type,
            pricePerHour: s.price_per_hour
        })),
        reviews: mate.reviews.map((r: any) => ({
            ...r,
            ownerEmoji: r.owner_emoji,
            ownerName: r.owner_name,
            repeatCount: r.repeat_count
        }))
    }));
}

export async function getMateById(id: string) {
    const { data: mate, error } = await supabase
        .from('mates')
        .select(`
      *,
      services (*),
      reviews (*)
    `)
        .eq('id', id)
        .single();

    if (error) return null;

    return {
        ...mate,
        bgGradient: mate.bg_gradient,
        imageUrl: mate.image_url,
        availableDates: mate.available_dates,
        repeatCount: mate.repeat_count,
        isNew: mate.is_new,
        trustScore: mate.trust_score,
        services: mate.services.map((s: any) => ({
            type: s.type,
            pricePerHour: s.price_per_hour
        })),
        reviews: mate.reviews.map((r: any) => ({
            ...r,
            ownerEmoji: r.owner_emoji,
            ownerName: r.owner_name,
            repeatCount: r.repeat_count
        }))
    };
}

export async function getPets() {
    const { data: pets, error } = await supabase
        .from('pets')
        .select('*');

    if (error) throw error;

    return pets.map((pet: any) => ({
        ...pet,
        imageUrl: pet.image_url,
    }));
}

export async function getPetById(id: string) {
    const { data: pet, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;

    return {
        ...pet,
        imageUrl: pet.image_url,
    };
}
