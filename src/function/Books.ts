import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Book } from "./DeclareType";

export default class Books {
  constructor() {}

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
        const bookData:any = docs.data() as Book;

        // Fetch user information based on the owner field
        const userDocRef = doc(database, 'users', bookData.owner); // Corrected
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Map the user information to the book data
          bookData.owner = userData;
        }
  
        allBooks.push(bookData);
      }
      sessionStorage.setItem('booksData', JSON.stringify(allBooks));
      console.log(allBooks);
      return allBooks;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error);
      return [];
    }
  }
}
