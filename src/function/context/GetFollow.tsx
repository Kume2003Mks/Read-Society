/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';  // Adjust the path as needed
import Social from '../Social';
import { Followers } from '../DeclareType';

type FollowContextType = {
  followingUsers: Followers[];
  setFollowingUsers: React.Dispatch<React.SetStateAction<Followers[]>>;
};

const FollowContext = createContext<FollowContextType | undefined>(undefined);

interface FollowPro{
    children: React.ReactNode
}

export const FollowProvider: React.FC<FollowPro> = ({ children }) => {
  const [followingUsers, setFollowingUsers] = useState<Followers[]>([]);
  const { userData } = useAuth();
  const social = new Social();

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        if (userData && userData.user) {
          const followingUsersList = await social.getFollowingUsers(userData.user.uid);
          setFollowingUsers(followingUsersList);
        }
      } catch (error) {
        console.error('Error fetching following users:', error);
      }
    };

    fetchFollowingUsers();
  }, [userData]);

  return (
    <FollowContext.Provider value={{ followingUsers, setFollowingUsers }}>
      {children}
    </FollowContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFollow = (): FollowContextType => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};
