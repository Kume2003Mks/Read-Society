import { collection, getDocs, doc, getDoc, orderBy, query, where, Timestamp, addDoc, updateDoc } from "firebase/firestore";
import { database, storage } from "../utils/Firebase";
import { Book, Comment, Episode } from "./DeclareType";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import FatchProfiles from "./FetchProfiles";

interface BookData {
  title: string;
  genre: string;
  genre2: string;
  type: string;
  description: string;
  tags: string[];
  modified: Date;
  thumbnail?: string;
}

interface EpData {
  title: string;
  url?: string;
}

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
        const ownerProfile = await Profiles.fetchProfile(bookData.owner);
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
    console.log(ownerUid);
    try {
      const storedBooks = sessionStorage.getItem(`Bookdata${ownerUid}`);
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        console.log('session owner books', parsedBooks);
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
        const ownerProfile = await Profiles.fetchProfile(bookData.owner);
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
          return foundBook;
        }
      }
      // If not found in sessionStorage, search in Firebase Firestore
      const bookDocRef = doc(database, 'books', bookId);
      const bookDoc = await getDoc(bookDocRef);

      if (bookDoc.exists()) {
        const bookData: Book = bookDoc.data() as Book;
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchProfile(bookData.owner);
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
      const epsQuery = query(epsCollection, orderBy('upload'));

      const epsQuerySnapshot = await getDocs(epsQuery);

      const episodes: Episode[] = [];
      epsQuerySnapshot.forEach((doc) => {
        const episodeData = doc.data() as Episode;
        const EpId = doc.id;
        episodeData.id = EpId;
        episodes.push(episodeData);
      });

      console.log(episodes);

      return episodes;
    } catch (error) {
      console.error('Error searching for book data:', error);
      return null;
    }
  }

  public async getSomeEp(bookId: string, epId: string) {
    try {
      // If not found in sessionStorage, search in Firebase Firestore
      const epDocRef = doc(database, 'books', bookId, 'ep', epId);
      const epDoc = await getDoc(epDocRef);

      if (epDoc.exists()) {
        const epData: Episode = epDoc.data() as Episode;
        console.log(epData);
        return epData;
      } else {
        console.log('Book not found with the specified ID:', epId);
        return null;
      }
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
      return newBookRef.id
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  }

  public async uploadEp(bookId: string, epName: string, file: File) {
    try {
      const storage = getStorage();
      const epRef = ref(storage, `books_ID/${bookId}/ep/${epName + Math.floor(Math.random() * 256)}`);
      await uploadBytes(epRef, file);

      const epURL = await getDownloadURL(epRef);

      const bookRef = doc(database, 'books', bookId);
      const epCollectionRef = collection(bookRef, 'ep');

      const newEp = {
        title: epName,
        url: epURL,
        upload: Timestamp.now().toDate(),
      };

      const newEpRef = await addDoc(epCollectionRef, newEp);

      console.log('New episode added with ID:', newEpRef.id);
    } catch (error) {
      console.error('Error uploading episode:', error);
    }
  }

  public async editBook(
    bookId: string,
    title: string,
    genre: string,
    type: string,
    description: string,
    thumbnail: File | null,
    tags?: string[],
    genre2?: string
  ) {
    try {
      const booksCollection = collection(database, 'books');
      const bookRef = doc(booksCollection, bookId);

      const bookSnapshot = await getDoc(bookRef);

      const updatedData: BookData = {
        title,
        genre,
        genre2: genre2 || '',
        type,
        description,
        tags: tags || [],
        modified: Timestamp.now().toDate(),
      };

      if (thumbnail) {
        const existingThumbnail = bookSnapshot.get('thumbnail');
        const imageRef = ref(storage, existingThumbnail);
        await deleteObject(imageRef);

        const thumbnailRef = ref(storage, `books/${bookSnapshot.get('owner')}/${title}`);
        await uploadBytes(thumbnailRef, thumbnail);
        const thumbnailURL = await getDownloadURL(thumbnailRef);
        updatedData.thumbnail = thumbnailURL;
      }

      await updateDoc(bookRef, updatedData as Partial<BookData>);

      sessionStorage.removeItem('booksData');

      console.log('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  public async editEp(
    bookId: string,
    epId: string,
    title: string,
    pdf: File | null,

  ) {
    try {
      const epDocRef = doc(database, 'books', bookId, 'ep', epId);
      const epDoc = await getDoc(epDocRef);

      const updatedData: EpData = {
        title,
      };

      if (pdf) {
        const existingThumbnail = epDoc.get('url');
        const imageRef = ref(storage, existingThumbnail);
        await deleteObject(imageRef);

        const thumbnailRef = ref(storage, `books_ID/${bookId}/ep/${title + Math.floor(Math.random() * 256)}`);
        await uploadBytes(thumbnailRef, pdf);
        const thumbnailURL = await getDownloadURL(thumbnailRef);
        updatedData.url = thumbnailURL;
      }

      await updateDoc(epDocRef, updatedData as Partial<EpData>);

      sessionStorage.removeItem('booksData');

      console.log('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  public async addComment(bookId: string, uid: string, text: string) {
    try {
      const bookRef = doc(database, 'books', bookId);
      const commentsCollectionRef = collection(bookRef, 'comments');

      const newComment = {
        uid: uid,
        text: text,
        timestamp: Timestamp.now().toDate(),
      };

      const docRef = await addDoc(commentsCollectionRef, newComment);

      console.log('Comment added with ID: ', docRef.id);
      return true;
    } catch (error) {
      console.error('Error adding comment: ', error);
      return false;
    }
  }

  public async getComments(bookId: string) {
    try {
      const bookRef = doc(database, 'books', bookId);
      const commentsCollectionRef = collection(bookRef, 'comments');

      // Use getDocs to query the 'comments' collection and get all documents
      const querySnapshot = await getDocs(commentsCollectionRef);

      const comments: Comment[] = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const Profiles = new FatchProfiles();
          const userProfile = await Profiles.fetchProfile(commentData.uid); // Fixed: Use 'uid' instead of 'profile'
          if (userProfile) {
            comments.push({
              uid: commentData.uid,
              profile: userProfile,
              text: commentData.text,
              timestamp: commentData.timestamp,
            });
          }
        })
      );

      return comments;
    } catch (error) {
      console.error('Error getting comments: ', error);
      return [];
    }
  }
}
