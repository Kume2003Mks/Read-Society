/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import Books from '../Books';
import { Book, Banner } from '../DeclareType';

interface MyCreationContextProps {
  Ownerbooks: Book[];
  books: Book[];
  OwnerbookCount: number;
  banner: Banner[];
  loading: boolean;
  ownerloading: boolean;
}

interface ContextProps {
  children: ReactNode;
}

const MybookContext = createContext<MyCreationContextProps | undefined>(undefined);

export const MybookProvider: React.FC<ContextProps> = ({ children }) => {
  const { userData } = useAuth();
  const [Ownerbooks, setownerBooks] = useState<Book[]>([]);
  const [OwnerbookCount, setOwnerbookCount] = useState<number>(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [banner, setBanner] = useState<Banner[]>([]);


  const [ownerloading, setOwnerloading] = useState(true);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    async function loadBooks() {
      const book = new Books();
      const data: Book[] = await book.getBooks();
      setBooks(data);
      setloading(false);
    }
    async function loadBooksByID() {
      const book = new Books();
      if (userData && userData.user.uid) {
        const data: Book[] = await book.getBooksByOwner(userData.user.uid);
        setownerBooks(data);
        setOwnerbookCount(data.length);
        setOwnerloading(false);
      }
    }
    async function loadBanner() {
      const book = new Books();
      const data: Banner[] = await book.getBanner();
      setBanner(data);
    }
    loadBooks();
    loadBooksByID();
    loadBanner()
  }, [userData]);

  return (
    <MybookContext.Provider value={{ books, Ownerbooks, OwnerbookCount, loading, ownerloading, banner }}>
      {children}
    </MybookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(MybookContext);
  if (!context) {
    throw new Error('useMyCreation must be used within a MyCreationProvider');
  }
  return context;
};
