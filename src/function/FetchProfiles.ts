import { doc, getDoc } from "firebase/firestore";
import { database } from "../utils/Firebase";
import { Profile } from "./DeclareType";

export default class FatchProfiles {

    public async fetchOwnerProfile(ownerUid: string): Promise<Profile | null> {
        try {
          const userDocRef = doc(database, 'users', ownerUid);
          const userDoc = await getDoc(userDocRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data() as Profile;
            return userData;
          } else {
            console.log('Owner profile not found for UID:', ownerUid);
            return null;
          }
        } catch (error) {
          console.error('Error fetching owner profile:', error);
          return null;
        }
      }
      
}