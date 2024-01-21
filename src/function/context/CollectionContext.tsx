/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Collection from "../getCollection"; // Update the path
import { Book } from "../DeclareType";
import { useAuth } from "./AuthContext";

interface CollectionContextProps {
    children: ReactNode;
}

interface CollectionContextValue {
    allcollection: Book[];
    bookmark: Book[];
    likebook: Book[];
    countallcollection: number;
    countbookmark: number;
    countlike: number;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export const CollectionProvider: React.FC<CollectionContextProps> = ({ children }) => {

    const { userData } = useAuth();

    const [allcollection, setCollection] = useState<Book[]>([]);
    const [bookmark, setBookmark] = useState<Book[]>([]);
    const [likebook, setlikebook] = useState<Book[]>([]);

    const [countallcollection, setcountCollection] = useState<number>(0);
    const [countbookmark, setcountbookmark] = useState<number>(0);
    const [countlike, setcountlike] = useState<number>(0);



    useEffect(() => {
        const fetchCollection = async () => {
            if (userData && userData.user.uid) {
                const collectionService = new Collection(userData.user.uid);
                const userCollection = await collectionService.getAllCollection();
                setCollection(userCollection);
                setcountCollection(userCollection.length)
                const bookmarkref = await collectionService.getBookmarks()
                setBookmark(bookmarkref);
                setcountbookmark(bookmarkref.length);
                const bookliked = await collectionService.getlikes();
                setlikebook(bookliked);
                setcountlike(bookliked.length)
            }
        };

        fetchCollection();
    }, [userData]);

    return (
        <CollectionContext.Provider value={{ allcollection, countallcollection, bookmark, countbookmark, likebook, countlike }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollection = (): CollectionContextValue => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("useCollection must be used within a CollectionProvider");
    }
    return context;
};
