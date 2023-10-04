import { Timestamp, collection, doc, getDocs, setDoc } from "firebase/firestore";
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
    About: string
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

        await setDoc(userProfileDocRef, updatedData, { merge: true });
        sessionStorage.removeItem('userProfile');
      }
    } catch (error) {
      throw error;
    }
  }


}