import React, { createContext, useState} from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
      const [user, setuser] = useState(null);

      // Function to update user data
      const updateUser = (userData) => {
            setuser(userData);
      };

      // Function to clear user data (e.g. on logout)
      const clearUser = () => {
            setuser(null);
      };

      // missing???

      return (
            <UserContext.Provider 
                  value={{
                        user, 
                        updateUser,
                        clearUser,
                  }}
            >
                  {children}
            </UserContext.Provider>
      );
}
export default UserProvider;