import { collection, getDocs, doc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Book } from "./DeclareType";
import Books from "./Books";


export default class getCollection {
    constructor(private userId: string) { }

    public async getAllCollection() {
        try {
            const userlikeCollectionRef = collection(doc(database, 'users', this.userId), 'likes');
            const userbookmarksCollectionRef = collection(doc(database, 'users', this.userId), 'bookmarks');

            const likedSnapshot = await getDocs(userlikeCollectionRef);
            const likedBookIds = likedSnapshot.docs.map(doc => doc.id);

            const bookmarkedSnapshot = await getDocs(userbookmarksCollectionRef);
            const bookmarkedBookIds = bookmarkedSnapshot.docs.map(doc => doc.id);

            const uniqueBookIds = Array.from(new Set([...likedBookIds, ...bookmarkedBookIds]));

            const book = new Books();
            const uniqueBooks: Book[] = await Promise.all(uniqueBookIds.map(id => book.getBookById(id)));
            const userowner :Book[] = await book.getBooksByOwner(this.userId);

            const combinedBooks: Book[] = [...new Map([...uniqueBooks, ...userowner].map(item => [item.id, item])).values()];

            console.log("Unique Books:", combinedBooks);
            return combinedBooks;

        } catch (error) {
            return [];
        }
    }

    public async getBookmarks(){
        try {
            const userlikesCollectionRef = collection(doc(database, 'users', this.userId), 'bookmarks');

            const likesSnapshot = await getDocs(userlikesCollectionRef);
            const likesBookIds = likesSnapshot.docs.map(doc => doc.id);

            const book = new Books();
            const likeBooks: Book[] = await Promise.all(likesBookIds.map(id => book.getBookById(id)));

            console.log("Unique Books:", likeBooks);
            return likeBooks;

        } catch (error) {
            return [];
        }
    } 

    public async getlikes(){
        try {
            const userbookmarksCollectionRef = collection(doc(database, 'users', this.userId), 'likes');

            const bookmarkedSnapshot = await getDocs(userbookmarksCollectionRef);
            const bookmarkedBookIds = bookmarkedSnapshot.docs.map(doc => doc.id);

            const book = new Books();
            const BookmarkBooks: Book[] = await Promise.all(bookmarkedBookIds.map(id => book.getBookById(id)));

            console.log("Unique Books:", BookmarkBooks);
            return BookmarkBooks;

        } catch (error) {
            console.error("Error fetching user's collection:", error);
            return [];
        }
    } 
}