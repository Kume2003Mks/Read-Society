import { collection, Timestamp, addDoc, getDocs } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Post } from "./DeclareType";
import FatchProfiles from "./FetchProfiles";

export default class Social{

    public async getPosts(){
        try {
            const storedPosts = sessionStorage.getItem('PostsData');
            if (storedPosts) {
              const parsedPosts = JSON.parse(storedPosts);
              console.log(parsedPosts);
              return parsedPosts;
            }
      
            const postCollection = collection(database, 'posts');
            const querySnapshot = await getDocs(postCollection);
      
            const allPosts: Post[] = [];
            for (const docs of querySnapshot.docs) {
              const postData: Post = docs.data() as Post;
              const bookId = docs.id;
              postData.id = bookId;

              const Profiles = new FatchProfiles()
              const ownerProfile = await Profiles.fetchOwnerProfile(postData.uid);
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

    /*
        public async addComent(comment: Coment, id: string){
            const { text, image, uid, timestamp, reply } = comment;
    
            const commentDocRef = await addDoc(collection(database, "comments"), {
                text,
                image,
                uid,
                timestamp,
                reply,
            });
    
            console.log("Comment added with ID: ", commentDocRef.id);
        }
    
        public async Like(postId: string, isLike: boolean) {
            const postRef = collection(database, "posts", postId);
            const likeField = isLike ? "likes" : "dislikes";
    
            await addDoc(collection(postRef, likeField), {
                uid: this.uid,
                timestamp: Timestamp.now(),
            });
    
            console.log("Post liked/disliked successfully!");
        }*/
}