import { Timestamp } from "firebase/firestore";

export interface Book {
    genre: string;
    genre2?: string;
    title: string;
    type: string;
    description: string;
    owner: string | Profile;
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
