import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './userAuth';

export const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/todo');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
};