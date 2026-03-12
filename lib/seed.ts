import { supabase } from './supabase';
import { MATES, RELATIONSHIP_TIMELINE } from './mockData';

async function seed() {
    console.log('Starting seed...');

    // 1. Clear existing data (in reverse order of dependencies)
    await supabase.from('timeline').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('mates').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    for (const mate of MATES) {
        const { data: mateData, error: mateError } = await supabase
            .from('mates')
            .insert({
                name: mate.name,
                emoji: mate.emoji,
                bg_gradient: mate.bgGradient,
                area: mate.area,
                city: mate.city,
                bio: mate.bio,
                tags: mate.tags,
                available_dates: mate.availableDates,
                repeat_count: mate.repeatCount || 0,
                is_new: mate.isNew || false,
                trust_score: mate.trustScore
            })
            .select()
            .single();

        if (mateError) {
            console.error('Error inserting mate:', mateError);
            continue;
        }

        // Insert services
        const servicesToInsert = mate.services.map(s => ({
            mate_id: mateData.id,
            type: s.type,
            price_per_hour: s.pricePerHour
        }));
        await supabase.from('services').insert(servicesToInsert);

        // Insert reviews
        const reviewsToInsert = mate.reviews.map(r => ({
            mate_id: mateData.id,
            owner_name: r.ownerName,
            owner_emoji: r.ownerEmoji,
            rating: r.rating,
            date: r.date,
            comment: r.comment,
            repeat_count: r.repeatCount
        }));
        await supabase.from('reviews').insert(reviewsToInsert);
    }

    // Insert timeline
    const timelineToInsert = RELATIONSHIP_TIMELINE.map(t => ({
        emoji: t.emoji,
        text: t.text,
        date: t.date,
        color: t.color
    }));
    await supabase.from('timeline').insert(timelineToInsert);

    console.log('Seed completed successfully!');
}

seed().catch(console.error);
