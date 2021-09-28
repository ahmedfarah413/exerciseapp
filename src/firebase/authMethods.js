import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function  signUp(username,email, pass, name,phone) {
    await auth().createUserWithEmailAndPassword( email, pass).catch((error) => {
      throw error 
     });
    const currentUser = auth().currentUser;
    const db = firestore();
    await db.collection("users").add({
      uid: currentUser.uid,
      username: username,
      email: currentUser.email,
      name: name,
      phone: phone
    }).catch((error) => {
        throw error
    })
}

 export async function logIn(mail, pass) {
    await auth().signInWithEmailAndPassword(mail, pass).catch(() => {
      throw ('email or password is incorrect!') 
     });
 }

export async function loggingOut() {
    await auth().signOut().catch(() => {
      throw ('Unknown error occurred') 
     });
}