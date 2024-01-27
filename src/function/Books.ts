import { collection, getDocs, doc, getDoc, orderBy, query, where, Timestamp, addDoc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Book, Episode } from "./DeclareType";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import FatchProfiles from "./FetchProfiles";

export default class Books {
  constructor() { }

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
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchOwnerProfile(bookData.owner);
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
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchOwnerProfile(bookData.owner);
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
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchOwnerProfile(bookData.owner);
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

  public async uploadBook(
    title: string,
    genre: string,
    genre2: string,
    type: string,
    description: string,
    tags: string[],
    owner: string,
    thumbnail: File) {

      try {
        const storage = getStorage();
        const thumbnailRef = ref(storage, `books/${owner}/${title}`);
        await uploadBytes(thumbnailRef, thumbnail);

        const thumbnailURL = await getDownloadURL(thumbnailRef);

        const newBook = {
          title: title,
          genre: genre,
          genre2: genre2,
          type: type,
          description: description,
          tags: tags,
          owner: owner,
          thumbnail: thumbnailURL,
          created: Timestamp.now().toDate()
        };

        const booksCollection = collection(database, 'books');
        const newBookRef = await addDoc(booksCollection, newBook);

        sessionStorage.removeItem(`Bookdata${owner}`);
    
        console.log('New book added with ID:', newBookRef.id);
      } catch (error) {
        console.error('Error uploading book:', error);
      }
    }

}
