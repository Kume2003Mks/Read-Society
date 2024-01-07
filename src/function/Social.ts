import { collection, Timestamp, addDoc, getDocs, query, where, doc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Post, Comment } from "./DeclareType";
import FatchProfiles from "./FetchProfiles";

export default class Social {

  public async getPosts() {
    try {
      /*     const storedPosts = sessionStorage.getItem('PostsData');
       if (storedPosts) {
           const parsedPosts = JSON.parse(storedPosts);
           console.log(parsedPosts);
           return parsedPosts;
         }*/

      const postCollection = collection(database, 'posts');
      const querySnapshot = await getDocs(postCollection);

      const allPosts: Post[] = [];
      for (const docs of querySnapshot.docs) {
        const postData: Post = docs.data() as Post;
        const bookId = docs.id;
        postData.id = bookId;

        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchProfile(postData.uid);
        if (ownerProfile) {
          postData.profile = ownerProfile;
        }

        allPosts.push(postData);
      }
      sessionStorage.setItem('PostsData', JSON.stringify(allPosts));
      console.log(allPosts);
      return allPosts;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  public async getPostsByID(ownerUid: string) {
    try {
      const postsCollection = collection(database, 'posts');
      const ownerQuery = query(postsCollection, where('uid', '==', ownerUid));
      const querySnapshot = await getDocs(ownerQuery);

      const allPosts: Post[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const postData: Post = docSnapshot.data() as Post;
        const bookId = docSnapshot.id;
        postData.id = bookId;
        const Profiles = new FatchProfiles()
        const ownerProfile = await Profiles.fetchProfile(postData.uid);
        if (ownerProfile) {
          postData.profile = ownerProfile;
        }
        allPosts.push(postData);
      }
      console.log(allPosts);
      return allPosts;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error);
      return [];
    }
  }

  public async addPost(uid: string, spoil: boolean, text?: string, images?: FileList) {
    let imageUrls: string[] = [];
    if (images) {
      imageUrls = await this.uploadImages(images, uid);
    }
    const postDocRef = await addDoc(collection(database, "posts"), {
      text,
      image: imageUrls,
      spoil,
      uid: uid,
      timestamp: Timestamp.now().toDate()
    });
    console.log("Post added with ID: ", postDocRef.id);
    return false;
  }

  private async uploadImages(images: FileList, uid: string): Promise<string[]> {
    const storage = getStorage();

    const promises = Array.from(images).map(async (image) => {
      const imageRef = ref(storage, `images/${uid}/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    });

    return Promise.all(promises);
  }

  public async addComment(text: string, uid: string, postId: string) {

      try {
        const postRef = doc(database, 'posts', postId);
        const commentsCollectionRef = collection(postRef, 'comments');
  
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

  public async getComments(PostId: string) {
    try {
      const postRef = doc(database, 'posts', PostId);
      const commentsCollectionRef = collection(postRef, 'comments');

      // Use getDocs to query the 'comments' collection and get all documents
      const querySnapshot = await getDocs(commentsCollectionRef);

      const comments: Comment[] = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const Profiles = new FatchProfiles();
          const userProfile = await Profiles.fetchProfile(commentData.uid);
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