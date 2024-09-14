import { useEffect, useState } from 'react';
import * as jose from 'jose';
import { apiRefreshToken } from '../api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFailRefreshToken, setIsFailRefreshToken] = useState(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      console.log("AUTH MIDDLEWARE >>>>>>>>>>> ");
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
                  if(response.status === 200) {
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    setIsAuthenticated(true);
                  }
                  else {
                    setIsAuthenticated(false);
                    setIsFailRefreshToken(true);
                  }
                } catch (error) {
                  console.error('Failed to refresh token', error);
                  setIsAuthenticated(false);
                  setIsFailRefreshToken(true);
                }
              }
            } else {
              setIsAuthenticated(true);
              setIsFailRefreshToken(false);
            }
          }
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    };

    checkAndRefreshToken();
  }, []);

  return { isAuthenticated, isFailRefreshToken };
};