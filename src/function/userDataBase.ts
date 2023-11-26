import { DocumentSnapshot, Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { database, storage } from "../utils/Firebase";

interface UserProfileData {
  userName: string;
  firstName: string;
  lastName: string;
  about_me: string;
  facebook: string;
  instagram: string;
  website: string;
  profile_image?: string;
  last_time?: Date;
}

export default class userDataBase {

  private uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  public async getProfile() {
    const sessionData = sessionStorage.getItem('userProfile');
    if (sessionData) {
      const userProfileData = JSON.parse(sessionData);
      return userProfileData;
    }

    const userDocRef = doc(database, 'users', this.uid);

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const userProfileData = docSnapshot.data();

        sessionStorage.setItem('userProfile', JSON.stringify(userProfileData));
        console.log(userProfileData);
        return userProfileData;

      } else {
        // หากไม่มีข้อมูล
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
}
  
  public async editProfile(
    username: string,
    firstName: string,
    lastName: string,
    Instagram: string,
    Facebook: string,
    Website: string,
    About: string,
    imageFile: File | null
  ) {
    const userDocRef = doc(database, 'users', this.uid);

    try {
      const sessionData = sessionStorage.getItem('userProfile');
      if (sessionData) {
        const userProfileData = JSON.parse(sessionData);

        const hasChanged =
          userProfileData.userName !== username ||
          userProfileData.firstName !== firstName ||
          userProfileData.lastName !== lastName;

        const updatedData: UserProfileData = {
          userName: username,
          firstName: firstName,
          lastName: lastName,
          about_me: About,
          facebook: Facebook,
          instagram: Instagram,
          website: Website,
        };

        if (hasChanged) {
          updatedData.last_time = Timestamp.now().toDate();
        }

        if (imageFile) {
          // ลบรูปภาพเก่าถ้ามี
          if (userProfileData.profile_image) {
            await this.deleteProfileImage(userProfileData.profile_image);
          }

          // อัปโหลดรูปภาพใหม่
          const imageUrl = await this.uploadProfileImage(imageFile);
          updatedData.profile_image = imageUrl;
        }
  
        await setDoc(userDocRef, updatedData, { merge: true });
        sessionStorage.removeItem('userProfile');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async uploadProfileImage(imageFile: File): Promise<string> {
    const storageRef = ref(storage, `profile_images/${this.uid}/${imageFile.name}`);

    try {
      // อัปโหลดรูปภาพไปยัง Firebase Storage
      const snapshot = await uploadBytes(storageRef, imageFile);
      
      // ดึง URL ของรูปภาพจาก Firebase Storage
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      return imageUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async deleteProfileImage(imageUrl: string): Promise<void> {
    const def_image: string = 'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/Uni.png?alt=media&token=dc96bce1-5857-4ad6-b9a5-e635074c2169'
    // สร้างอ้างอิงไปยังรูปภาพที่ต้องการลบ
    const imageRef = ref(storage, imageUrl);
  
    try {
      // ลบรูปภาพ
      if (def_image !== imageUrl){
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  
}