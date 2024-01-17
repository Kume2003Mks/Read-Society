import { doc, collection, deleteDoc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { database } from '../utils/Firebase';

export default class interaction {
    constructor(private bookId: string) {
    }

    public async like(userId: string) {
        try {
            const likesCollectionRef = collection(doc(database, 'books', this.bookId), 'likes');
            const likeDocRef = doc(likesCollectionRef, userId);

            await setDoc(likeDocRef, { liked: true });
            console.log('Like added successfully');
        } catch (error) {
            console.error('Error adding like:', error);
            throw error;
        }
    }

    public async getLikes(userId: string) {
        try {
            const likesCollectionRef = collection(doc(database, 'books', this.bookId), 'likes');
            const likeDocRef = doc(likesCollectionRef, userId);

            const likeDocSnapshot = await getDoc(likeDocRef);
            const userLiked = likeDocSnapshot.exists() && likeDocSnapshot.data().liked;

            return { userLiked };
        } catch (error) {
            console.error('Error getting likes:', error);
            throw error;
        }
    }

    public async unlike(userId: string) {
        try {
            const likesCollectionRef = collection(doc(database, 'books', this.bookId), 'likes');
            const likeDocRef = doc(likesCollectionRef, userId);

            await deleteDoc(likeDocRef);
            console.log('Like removed successfully');
        } catch (error) {
            console.error('Error removing like:', error);
            throw error;
        }
    }

    public async getAllLikes() {
        try {
            const likesCollectionRef = collection(doc(database, 'books', this.bookId), 'likes');
            const likesSnapshot = await getDocs(likesCollectionRef);

            const allLikes = likesSnapshot.docs.map(doc => ({
                userId: doc.id,
                liked: doc.data().liked,
            }));

            return allLikes.length;
        } catch (error) {
            console.error('Error getting all likes:', error);
            throw error;
        }
    }

    public async addBookmark(userId: string) {
        try {
            const bookmarksCollectionRef = collection(doc(database, 'users', userId), 'bookmarks');
            const bookmarkDocRef = doc(bookmarksCollectionRef, this.bookId);

            await setDoc(bookmarkDocRef, { bookmarked: true });
            console.log('Bookmark added successfully');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            throw error;
        }
    }

    async removeBookmark(userId: string) {
        try {
            const bookmarksCollectionRef = collection(doc(database, 'users', userId), 'bookmarks');
            const bookmarkDocRef = doc(bookmarksCollectionRef, this.bookId);

            await deleteDoc(bookmarkDocRef);
            console.log('Bookmark removed successfully');
        } catch (error) {
            console.error('Error removing bookmark:', error);
            throw error;
        }
    }

    async getBookmarked(userId: string) {
        try {
            const bookmarksCollectionRef = collection(doc(database, 'users', userId), 'bookmarks');
            const bookmarkDocRef = doc(bookmarksCollectionRef, this.bookId);
    
            const bookmarkDocSnapshot = await getDoc(bookmarkDocRef);
            const userBookmarked = bookmarkDocSnapshot.exists() && bookmarkDocSnapshot.data().bookmarked;
    
            return { userBookmarked };
        } catch (error) {
            console.error('Error getting bookmark status:', error);
            throw error;
        }
    }

}
