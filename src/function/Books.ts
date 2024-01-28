import { collection, getDocs, doc, getDoc, orderBy, query, where, Timestamp, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { database, storage } from "../utils/Firebase";
import { Book, Comment, Episode, Banner } from "./DeclareType";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import FatchProfiles from "./FetchProfiles";
import interaction from "./interaction";

interface BookData {
  title: string;
  genre: string;
  genre2: string;
  type: string;
  description: string;
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
        const like = new interaction(bookData.id)
        const countlike = await like.getAllLikes();
        bookData.like = countlike;

        allBooks.push(bookData);
      }
      sessionStorage.setItem('booksData', JSON.stringify(allBooks));
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
        return parsedBooks;
      }

      const booksCollection = collection(database, 'books');
      const ownerQuery = query(booksCollection, where('owner', '==', ownerUid));
      const querySnapshot = await getDocs(ownerQuery);

      const allBooks: Book[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const bookData: Book = docSnapshot.data() as Book;
        const bookId = docSnapshot.id;
        bookData.id = bookId;
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchProfile(bookData.owner);
        if (ownerProfile) {
          bookData.profile = ownerProfile;
        }

        const like = new interaction(bookData.id)
        const countlike = await like.getAllLikes();
        bookData.like = countlike;

        allBooks.push(bookData);
      }
      sessionStorage.setItem(`Bookdata${ownerUid}`, JSON.stringify(allBooks));
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

      const bookDocRef = doc(database, 'books', bookId);
      const bookDoc = await getDoc(bookDocRef);

      if (bookDoc.exists()) {
        const bookData: Book = bookDoc.data() as Book;
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchProfile(bookData.owner);
        if (ownerProfile) {
          bookData.profile = ownerProfile;
        }

        const like = new interaction(bookData.id)
        const countlike = await like.getAllLikes();
        bookData.like = countlike;

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
    owner: string,
    thumbnail: File) {

    try {
      const storage = getStorage();
      const thumbnailRef = ref(storage, `books/${owner}/${title + Math.floor(Math.random() * 256)}`);
      await uploadBytes(thumbnailRef, thumbnail);

      const thumbnailURL = await getDownloadURL(thumbnailRef);

      const newBook = {
        title: title,
        genre: genre,
        genre2: genre2,
        type: type,
        description: description,
        owner: owner,
        thumbnail: thumbnailURL,
        created: Timestamp.now().toDate()
      };

      const booksCollection = collection(database, 'books');
      const newBookRef = await addDoc(booksCollection, newBook);

      sessionStorage.removeItem(`Bookdata${owner}`);
      sessionStorage.removeItem('booksData');
      console.log('New book added with ID:', newBookRef.id);
      return newBookRef.id
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  }

  public async uploadEp(bookId: string, epName: string, file: File) {
    try {
      const storage = getStorage();
      const epRef = ref(storage, `books_EP/${bookId}/ep/${epName + Math.floor(Math.random() * 256)}`);
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

      comments.sort((a: Comment, b: Comment) => {
        const aTimestamp = a.timestamp?.seconds ?? 0;
        const bTimestamp = b.timestamp?.seconds ?? 0;
        return bTimestamp - aTimestamp;
      });

      return comments;
    } catch (error) {
      console.error('Error getting comments: ', error);
      return [];
    }
  }

  public async deleteBook(bookId: string) {
    try {
      const booksCollection = collection(database, 'books');
      const bookRef = doc(booksCollection, bookId);

      const bookDoc = await getDoc(bookRef);
      const bookData = bookDoc.data() as Book;

      if (bookData.thumbnail) {
        const thumbnailRef = ref(storage, bookData.thumbnail);
        await deleteObject(thumbnailRef);
      }

      const epsCollection = collection(database, 'books', bookId, 'ep');
      const epsQuerySnapshot = await getDocs(epsCollection);

      await Promise.all(
        epsQuerySnapshot.docs.map(async (doc) => {
          const epData = doc.data() as Episode;
          if (epData.url) {
            const epUrlRef = ref(storage, epData.url);
            await deleteObject(epUrlRef);
          }
        })
      );

      await deleteDoc(bookRef);

      sessionStorage.removeItem('booksData');
      sessionStorage.removeItem(`Bookdata${bookData.owner}`);

      console.log('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  public async deleteEpisode(bookId: string, epId: string) {
    try {
      const epDocRef = doc(database, 'books', bookId, 'ep', epId);
      const epDoc = await getDoc(epDocRef);
      if (!epDoc.exists()) {
        console.log('Episode not found with the specified ID:', epId);
        return;
      }
      const epData = epDoc.data() as EpData;
      await deleteDoc(epDocRef);
      if (epData.url) {
        const contentRef = ref(storage, epData.url);
        await deleteObject(contentRef);
      }
      console.log('Episode deleted successfully!');
    } catch (error) {
      console.error('Error deleting episode:', error);
    }
  }

  public async getBanner() {
    try {
      const storedBanner = sessionStorage.getItem('banner');
      if (storedBanner) {
        const parsed = JSON.parse(storedBanner);
        return parsed;
      }
        const bannerCollection = collection(database, 'banner');
        const querySnapshot = await getDocs(bannerCollection);

        const allBanner: Banner[] = [];
        for (const docs of querySnapshot.docs) {
            const bannerData: Banner = docs.data() as Banner;
            const bookId = docs.id;
            bannerData.id = bookId;
            allBanner.push(bannerData);
        }
        sessionStorage.setItem('banner', JSON.stringify(allBanner));
        return allBanner;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


}
