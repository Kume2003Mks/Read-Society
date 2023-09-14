// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import authentication from './authentication'; // แก้ไฟล์อ้างอิงไปยังคลาส authentication

// สร้าง instance ของคลาส authentication
const auth = new authentication();

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstname: string, lastname: string, username: string) => Promise<void>;
  logout: () => void; 
  getAuthStatus: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(auth.getAuthStatus());
  }, []);

  const login = async (email: string, password: string) => {
    await auth.login(email, password);
    setIsLoggedIn(auth.getAuthStatus());
  };

  const register = async (email: string, password: string, firstname: string, lastname: string, username: string) => {
    await auth.register(email, password, firstname, lastname, username);
    setIsLoggedIn(auth.getAuthStatus());
  };

  const logout = () => {
    auth.logout(); // เรียกใช้ฟังก์ชัน logout จากคลาส authentication
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout, getAuthStatus: auth.getAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
