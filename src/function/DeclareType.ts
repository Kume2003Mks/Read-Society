import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export type Book = {
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
    like: number;
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
    url: string;
    upload: Timestamp;
}

export interface ProtectRouteProps {
    user: boolean;
    children: ReactNode;
}

export type Post = {
    id: string;
    text?: string;
    image?: string[];
    spoil?: boolean;
    uid: string;
    timestamp: Timestamp;
    profile?: Profile;
    like?: undefined | boolean;
    comments?: Comment;
}

export type Comment = {
    text?: string;
    profile?: Profile;
    uid: string;
    timestamp?: Timestamp;
}

export type Followers = {
    uid: string;
    profile: Profile;
}