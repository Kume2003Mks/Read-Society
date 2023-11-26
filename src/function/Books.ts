import { collection, getDocs, doc, getDoc, orderBy, query, where } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Book, Episode, Profile } from "./DeclareType";

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

  public async uploadBook(){
    
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
        const bookData: Book = docs.data() as Book;
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

  public async getBooksByOwner(ownerUid: string) {
    try {
      const storedBooks = sessionStorage.getItem(`Bookdata${ownerUid}`);
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        console.log(parsedBooks);
        return parsedBooks;
      }

      const booksCollection = collection(database, 'books');
      const ownerQuery = query(booksCollection, where('owner', '==', ownerUid));
      const querySnapshot = await getDocs(ownerQuery);

      const allBooks: Book[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const bookData: Book = docSnapshot.data() as Book;
        const bookId = docSnapshot.id; // เพิ่มบรรทัดนี้เพื่อดึง ID ของเอกสาร
        bookData.id = bookId;
        
        const ownerProfile = await this.fetchOwnerProfile(bookData.owner);
        if (ownerProfile) {
          bookData.profile = ownerProfile;
        }
        allBooks.push(bookData);
      }
      sessionStorage.setItem(`Bookdata${ownerUid}`, JSON.stringify(allBooks));
      console.log(allBooks);
      return allBooks;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error);
      return [];
    }
  }

  public async getBookById(bookId: string) {
    try {
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
        const bookData: Book = bookDoc.data() as Book;

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

  public async getEpisodesById(bookId: string) {
    try {
      const epsCollection = collection(database, 'books', bookId, 'ep');
      const epsQuery = query(epsCollection, orderBy('upload')); // แทน 'timestamp' ด้วยชื่อฟิลด์ที่เก็บเวลา

      const epsQuerySnapshot = await getDocs(epsQuery);

      const episodes: Episode[] = [];
      epsQuerySnapshot.forEach((doc) => {
        const episodeData = doc.data() as Episode;
        const bookId = doc.id;
        episodeData.id = bookId;
        episodes.push(episodeData);
      });

      console.log(episodes);

      return episodes;
    } catch (error) {
      console.error('Error searching for book data:', error);
      return null;
    }
  }

}
