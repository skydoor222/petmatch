import { unstable_noStore as noStore } from 'next/cache';
import BottomNav from '@/components/BottomNav';
import { getMates } from '@/lib/supabase';
import MatesClient from './MatesClient';

export default async function MatesPage() {
  noStore();
  const allMates = await getMates();

  // We pass data to the client component for interactive filtering
  return (
    <MatesClient initialMates={allMates} />
  );
}
