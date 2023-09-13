import { Auth, database } from "../utils/Firebase";
import {
    signInWithEmailAndPassword,
    UserCredential,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';

export default class authentication {

    constructor() {
        // initialize
    }

    public getAuthStatus() {
        const user = Auth.currentUser;
            if (user) {
                console.log('user: ' + user.email);
                return true;
            } else {
                console.log('user: None');
                return false;
            }
    }

    public async login(email: string, password: string) {
        await signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                console.log('Login successfully');
                const user = userCredential.user;
                console.log('Login With', user.email);
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

            // Create a new subcollection for the user profiles and set the user data as a document within it
            const userProfilesCollectionRef = collection(database, 'users', user.uid, 'profiles');
            const userProfileDocRef = doc(userProfilesCollectionRef, user.uid);

            await setDoc(userProfileDocRef, userData);

            console.log('Registration successful');
            alert('Registration successful');
        } catch (error: any) {
            console.error('Error registering user:', error.message);
        }
    }
}