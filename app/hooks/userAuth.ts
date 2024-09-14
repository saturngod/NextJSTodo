import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { refreshToken } from '../api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }

      try {
        const response = await refreshToken();
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.accessToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated };
}