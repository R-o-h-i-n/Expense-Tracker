import React, { createContext, useEffect, useState} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
      const [user, setuser] = useState(null);
      const [loading, setLoading] = useState(true);

      // Function to update user data
      const updateUser = (userData) => {
            setuser(userData);
      };

      // Function to clear user data (e.g. on logout)
      const clearUser = () => {
            setuser(null);
      };

      const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch user data using the stored token
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const userData = response.data;

      if (userData) {
        setuser(userData);
      }
    } catch (error) {
      console.error("Error restoring user session:", error);
      // If token is invalid, remove it and redirect to login
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setuser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on app initialization
  useEffect(() => {
    checkAuthStatus();
  }, []);

      return (
            <UserContext.Provider 
                  value={{
                        user, 
                        updateUser,
                        clearUser,
                        loading
                  }}
            >
                  {children}
            </UserContext.Provider>
      );
}
export default UserProvider;