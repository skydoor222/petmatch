import { supabase } from './supabase';
import { MATES, RELATIONSHIP_TIMELINE, PETS } from './mockData';

async function seed() {
    console.log('Starting seed...');

    // 1. Clear existing data
    console.log('Clearing old data...');
    await supabase.from('timeline').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('mates').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('pets').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Insert Pets
    console.log('Inserting pets...');
    for (const pet of PETS) {
        const { error } = await supabase.from('pets').insert({
            name: pet.name,
            breed: pet.breed,
            category: pet.category,
            age: pet.age,
            gender: pet.gender,
            image_url: pet.imageUrl,
            description: pet.description,
            area: pet.area,
            status: pet.status,
            request_date: pet.requestDate,
            request_time: pet.requestTime,
            request_period: pet.requestPeriod,
            request_blocks: pet.requestBlocks
        });
        if (error) console.error(`Error inserting pet ${pet.name}:`, error);
        else console.log(`Inserted pet: ${pet.name}`);
    }

    // 3. Insert Mates
    console.log('Inserting mates...');
    for (const mate of MATES) {
        const { data: mateData, error: mateError } = await supabase
            .from('mates')
            .insert({
                name: mate.name,
                emoji: mate.emoji,
                image_url: mate.imageUrl,
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

    // 4. Insert timeline
    console.log('Inserting timeline...');
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
