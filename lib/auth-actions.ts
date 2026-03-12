'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export async function signUp(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return { error: error.message };
    }

    redirect('/auth/setup');
}

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error: error.message };
    }

    redirect('/');
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/welcome');
}

export async function saveProfile(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/welcome');

    const displayName = formData.get('display_name') as string;
    const area = formData.get('area') as string;
    const petName = formData.get('pet_name') as string;
    const species = formData.get('species') as string;
    const age = parseInt(formData.get('age') as string) || 0;

    // Upsert user profile
    await supabase.from('user_profiles').upsert({
        id: user.id,
        display_name: displayName,
        area,
        role: 'owner',
    });

    // Insert pet
    if (petName) {
        await supabase.from('pets').insert({
            owner_id: user.id,
            name: petName,
            species,
            age,
        });
    }

    redirect('/');
}

export async function createBookingRequest(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    const mateId = formData.get('mateId') as string;
    const serviceType = formData.get('serviceType') as string;
    const bookingDate = formData.get('bookingDate') as string;
    const hours = parseInt(formData.get('hours') as string) || 1;
    const totalPrice = parseInt(formData.get('totalPrice') as string);
    const notes = formData.get('notes') as string;

    const { error } = await supabase.from('booking_requests').insert({
        owner_id: user.id,
        mate_id: mateId,
        service_type: serviceType,
        booking_date: bookingDate,
        hours,
        total_price: totalPrice,
        notes,
        status: 'pending'
    });

    if (error) {
        console.error('Error creating booking request:', error);
        return { error: error.message };
    }

    redirect(`/request/${mateId}/success`);
}
