'use client';

import { useAuthRedirect } from '@/app/hooks/useAuthRedirect';

export default function Home() {
  useAuthRedirect();

  return null; // No need to render anything as the user will be redirected
}