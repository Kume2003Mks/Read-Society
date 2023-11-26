import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export type Book = {
    id: string;
    genre: string;
    genre2?: string;
    title: string;
    type: string;
    description: string;
    tags?: string[];
    owner: string;
    profile?: Profile;
    thumbnail: string;
    created: Timestamp;
}

export type Profile = {
    userName: string;
    firstName: string;
    lastName: string;
    about_me: string;
    profile_image: string;
    facebook: string;
    instagram: string;
    website: string;
}

export type Episode = {
    id: string;
    title: string;
    bookfile: string;
    upload: Timestamp;
}

export interface ProtectRouteProps {
    user: boolean;
    children: ReactNode;
}