import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Book, Profile } from "./DeclareType";

export default class Books {
  constructor() { }

  private async fetchOwnerProfile(ownerUid: string): Promise<Profile | null> {
    try {
      const userDocRef = doc(database, 'users', ownerUid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as Profile;
        return userData;
      } else {
        console.log('Owner profile not found for UID:', ownerUid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching owner profile:', error);
      return null;
    }
  }

  public async getBooks() {
    try {
      const storedBooks = sessionStorage.getItem('booksData');
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        console.log(parsedBooks);
        return parsedBooks;
      }

      const booksCollection = collection(database, 'books');
      const querySnapshot = await getDocs(booksCollection);

      const allBooks: Book[] = [];
      for (const docs of querySnapshot.docs) {
        const bookData: any = docs.data() as Book;
        const bookId = docs.id;
        bookData.id = bookId;

        const ownerProfile = await this.fetchOwnerProfile(bookData.owner);
        if (ownerProfile) {
          bookData.profile = ownerProfile;
        }

        allBooks.push(bookData);
      }
      sessionStorage.setItem('booksData', JSON.stringify(allBooks));
      console.log(allBooks);
      return allBooks;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  public async getBookById(bookId: string) {
    try {
      // Check in sessionStorage first
      const storedBooks = sessionStorage.getItem('booksData');
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        const foundBook = parsedBooks.find((book: Book) => book.id === bookId);
        if (foundBook) {
          console.log(foundBook);
          return foundBook;
        }
      }

      // If not found in sessionStorage, search in Firebase Firestore
      const bookDocRef = doc(database, 'books', bookId);
      const bookDoc = await getDoc(bookDocRef);

      if (bookDoc.exists()) {
        const bookData: any = bookDoc.data() as Book;

        // Fetch owner's profile information
        const ownerProfile = await this.fetchOwnerProfile(bookData.owner);
        if (ownerProfile) {
          bookData.profile = ownerProfile;
        }

        console.log(bookData)
        return bookData;
      } else {
        console.log('Book not found with the specified ID:', bookId);
        return null;
      }
    } catch (error) {
      console.error('Error searching for book data:', error);
      return null;
    }
  }


}
