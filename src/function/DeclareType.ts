import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface Book {
    id: string;
    genre: string;
    genre2?: string;
    title: string;
    type: string;
    description: string;
    owner: string;
    profile?: Profile;
    thumbnail: string;
    created: Timestamp;
}

export interface Profile {
    userName: string;
    firstName: string;
    lastName: string;
    about_me: string;
    profile_image: string;
    facebook: string;
    instagram: string;
    website: string;
}

export interface ProtectRouteProps {
    user: boolean;
    children: ReactNode;
  }