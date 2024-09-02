'use client';

import { useEffect, useState } from 'react';
import TodoApp from "./TodoApp";
import * as jose from 'jose';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        try {
          const decodedToken = jose.decodeJwt(token);
          if (decodedToken && typeof decodedToken !== 'string') {
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp && decodedToken.exp < currentTime) {
              console.log('Token is expired');
              // Token is expired, try to refresh
              const refreshToken = localStorage.getItem('refreshToken');
              
              if (refreshToken) {
                try {
                  const response = await fetch('/api/token/refresh', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${refreshToken}`,
                    },
                  });

                  if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    setIsAuthenticated(true);
                  } else {
                    // Refresh failed, user needs to log in again
                    setIsAuthenticated(false);
                  }
                } catch (error) {
                  console.error('Error refreshing token:', error);
                  setIsAuthenticated(false);
                }
              } else {
                setIsAuthenticated(false);
              }
            } else {
              // Token is still valid
              setIsAuthenticated(true);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAndRefreshToken();
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to access the Todo App</div>;
  }

  return <TodoApp />;
}