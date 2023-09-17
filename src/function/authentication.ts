import { Auth, database } from "../utils/Firebase";
import {
    signInWithEmailAndPassword,
    UserCredential,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';

export default class authentication {

    private storageKey: string = 'users';

    constructor() {
        // initialize
    }

    // เข้ารหัสข้อมูลจาก Base64
    private encodeData(data: any): string {
        const jsonData = JSON.stringify(data);
        return btoa(jsonData);
    }

    // ถอดรหัสข้อมูลจาก Base64
    private decodeData(encodedData: string): any {
        const jsonData = atob(encodedData);
        return JSON.parse(jsonData);
    }

    
    public getAuthStatus() {
        const encodedData = localStorage.getItem(this.storageKey);
        if (encodedData) {
            const decodedData = this.decodeData(encodedData);
            if (decodedData && decodedData.user) {
                return decodedData.user; // return user data with decoded data
            }
        }
        return null; // if not found user
    }

    public async login(email: string, password: string) {
        await signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                alert('Login successfully');
                const user = userCredential.user;
                console.log('Login With', user.email);
                localStorage.setItem(this.storageKey, this.encodeData({ user: userCredential.user }));
                window.location.reload();
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert("login failed");
            });
    }

    public async register(email: string, password: string, firstname: string, lastname: string, username: string) {
        const profile_image: string = 'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/profile.png?alt=media&token=1ae321b5-a447-4ca8-81f3-53875f3c0db8'
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(Auth, email, password);
            const user = userCredential.user;

            const userData = {
                firstName: firstname,
                lastName: lastname,
                userName: username,
                profile_image: profile_image,
                about_me: '', //default value
                facebook: '', //default value
                instagram: '', //default value
                website: '', //default value
            };

            const userProfilesCollectionRef = collection(database, 'users', user.uid, 'profiles');
            const userProfileDocRef = doc(userProfilesCollectionRef, user.uid);

            await setDoc(userProfileDocRef, userData);
            localStorage.setItem(this.storageKey, this.encodeData({ user: userCredential.user }));
            console.log('Registration successful');
            alert('Registration successful');
        } catch (error: any) {
            console.error('Error registering user:', error.message);
        }
    }

    public async logout() {
        try {
            await firebaseSignOut(Auth);
            console.log('Logout successful');
            sessionStorage.removeItem('userProfile')
            localStorage.removeItem(this.storageKey);
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
}