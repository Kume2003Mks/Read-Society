import { collection, Timestamp, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Post, Comment, Followers } from "./DeclareType";
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
      const querySnapshot = await getDocs(commentsCollectionRef);

      const comments: Comment[] = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const Profiles = new FatchProfiles();
          const userProfile = await Profiles.fetchProfile(commentData.uid);
          if (userProfile) {
            comments.push({
              id: doc.id,
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

  public async followUser(currentUserUid: string, targetUserUid: string) {
    try {
      const userRef = doc(database, 'users', currentUserUid);
      const followCollectionRef = collection(userRef, 'follow');

      const isAlreadyFollowing = await this.isFollowing(currentUserUid, targetUserUid);
      if (!isAlreadyFollowing) {
        await addDoc(followCollectionRef, { uid: targetUserUid });
        console.log('Successfully followed user:', targetUserUid);
        return true;
      } else {
        console.log('User is already being followed:', targetUserUid);
        return false;
      }
    } catch (error) {
      console.error('Error following user:', error);
      return false;
    }
  }

  private async isFollowing(currentUserUid: string, targetUserUid: string): Promise<boolean> {
    try {
      const userRef = doc(database, 'users', currentUserUid);
      const followCollectionRef = collection(userRef, 'follow');
      const followQuery = query(followCollectionRef, where('uid', '==', targetUserUid));
      const querySnapshot = await getDocs(followQuery);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if user is already being followed:', error);
      return false;
    }
  }

  public async checkFollowStatus(currentUserUid: string, targetUserUid: string): Promise<boolean> {
    try {
      const userRef = doc(database, 'users', currentUserUid);
      const followCollectionRef = collection(userRef, 'follow');
      const followQuery = query(followCollectionRef, where('uid', '==', targetUserUid));
      const querySnapshot = await getDocs(followQuery);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  }

  public async unfollowUser(currentUserUid: string, targetUserUid: string) {
    try {
      const userRef = doc(database, 'users', currentUserUid);
      const followCollectionRef = collection(userRef, 'follow');
      const followQuery = query(followCollectionRef, where('uid', '==', targetUserUid));
      const querySnapshot = await getDocs(followQuery);

      if (!querySnapshot.empty) {
        const followDoc = querySnapshot.docs[0];
        await deleteDoc(followDoc.ref);
        console.log('Successfully unfollowed user:', targetUserUid);
      } else {
        console.log('User is not being followed:', targetUserUid);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  }

  public async getFollowingUsers(uid: string) {
    try {
      const userRef = doc(database, 'users', uid);
      const followCollectionRef = collection(userRef, 'follow');
      const querySnapshot = await getDocs(followCollectionRef);

      const followingUsers: Followers[] = [];

      await Promise.all(querySnapshot.docs.map(async (doc) => {
        const followData = doc.data();
        const profiles = new FatchProfiles();
        const userProfile = await profiles.fetchProfile(followData.uid);

        if (userProfile) {
          followingUsers.push({
            uid: followData.uid,
            profile: userProfile,
          });
        }
      }));

      return followingUsers;
    } catch (error) {
      console.error('Error fetching following users:', error);
      return [];
    }
  }
}