import { Timestamp, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { database, storage } from "../utils/Firebase";

export default class userDataBase {

  private uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  public async getProfile() {
    // ตรวจสอบ Session Storage ก่อน
    const sessionData = sessionStorage.getItem('userProfile');
    if (sessionData) {
      const userProfileData = JSON.parse(sessionData);
      return userProfileData;
    }

    // ถ้าไม่มีข้อมูลใน Session Storage ให้ดึงข้อมูลใน Firestore
    const userDocRef = doc(database, 'users', this.uid);
    const profilesCollectionRef = collection(userDocRef, 'profiles');

    try {
      const querySnapshot = await getDocs(profilesCollectionRef);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const userProfileData = firstDoc.data();

        sessionStorage.setItem('userProfile', JSON.stringify(userProfileData));
        return userProfileData;
      } else {
        // หากไม่มีข้อมูล
        return null;
      }
    } catch (error) {
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
    const profilesCollectionRef = collection(userDocRef, 'profiles');
    const userProfileDocRef = doc(profilesCollectionRef, this.uid);

    try {
      const sessionData = sessionStorage.getItem('userProfile');
      if (sessionData) {
        const userProfileData = JSON.parse(sessionData);

        const hasChanged =
          userProfileData.userName !== username ||
          userProfileData.firstName !== firstName ||
          userProfileData.lastName !== lastName;

        const updatedData: any = {
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
  
        await setDoc(userProfileDocRef, updatedData, { merge: true });
        sessionStorage.removeItem('userProfile');
      }
    } catch (error) {
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
      throw error;
    }
  }

  private async deleteProfileImage(imageUrl: string): Promise<void> {
    // สร้างอ้างอิงไปยังรูปภาพที่ต้องการลบ
    const imageRef = ref(storage, imageUrl);
  
    try {
      // ลบรูปภาพ
      await deleteObject(imageRef);
    } catch (error) {
      throw error;
    }
  }
  
  
}