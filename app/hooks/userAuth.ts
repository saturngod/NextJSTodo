import { useEffect, useState } from 'react';
import * as jose from 'jose';
import { refreshToken as apiRefreshToken } from '../api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jose.decodeJwt(token);
          if (decodedToken && typeof decodedToken !== 'string') {
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp && decodedToken.exp < currentTime) {
              const refreshToken = localStorage.getItem('refreshToken');
              if (refreshToken) {
                try {
                  const response = await apiRefreshToken(refreshToken);
                  // Handle response and update token
                } catch (error) {
                  console.error('Failed to refresh token', error);
                }
              }
            } else {
              setIsAuthenticated(true);
            }
          }
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    };

    checkAndRefreshToken();
  }, []);

  return { isAuthenticated };
};