import { collection, doc, getDocs } from "firebase/firestore";
import { database } from "../utils/Firebase";

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
          const userProfileData:any = [];
      
          querySnapshot.forEach((doc) => {
            userProfileData.push(doc.data());
          });
      
          // บันทึกข้อมูลใน Session Storage
          sessionStorage.setItem('userProfile', JSON.stringify(userProfileData));
      
          return userProfileData;
        } catch (error) {
          throw error;
        }
      }
      
}