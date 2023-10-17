import { Auth, database } from '../utils/Firebase';
import Swal from 'sweetalert2';
import {
    signInWithEmailAndPassword,
    UserCredential,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import { Timestamp, doc, setDoc } from 'firebase/firestore';

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
                const user = userCredential.user;
                console.log('Login With', user.email);
                localStorage.setItem(this.storageKey, this.encodeData({ user: userCredential.user }));
                Swal.fire({
                    title: '<strong>Login successfully</strong>',
                    icon: 'success',
                    confirmButtonText: '<h1>Ok</h1>',
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                Swal.fire({
                    title: '<strong>Login Failed</strong>',
                    icon: 'error',
                    confirmButtonText: '<h1>Ok</h1>',
                });
            });
    }

    public async register(email: string, password: string, firstname: string, lastname: string, username: string) {
        const profile_image: string = 'https://firebasestorage.googleapis.com/v0/b/webdeploytest-e935e.appspot.com/o/Uni.png?alt=media&token=dc96bce1-5857-4ad6-b9a5-e635074c2169'
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
                last_time: Timestamp.now().toDate(), //default value
            };

            const userDocumentRef = doc(database, 'users', user.uid);
            await setDoc(userDocumentRef, userData);

            localStorage.setItem(this.storageKey, this.encodeData({ user: userCredential.user }));
            console.log('Registration successful');
            Swal.fire({
                title: '<strong>Registration successful</strong>',
                icon: 'success',
                confirmButtonText: '<h1>Ok</h1>',
                timer: 3000,
                timerProgressBar: true,
            }).then(() => {
                window.location.reload();
            });
        } catch (error: any) {
            console.error('Error registering user:', error.message);
            Swal.fire({
                title: '<strong>Registration Failed</strong>',
                icon: 'error',
                confirmButtonText: '<h1>Ok</h1>',
            });
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