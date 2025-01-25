import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app, firestoreDb } from "../../lib/firebase/config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export default class AuthService {
  /* Firebase Auth Methods */
  static async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async googleSignInUp() {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async findUserByEmail(email) {
    const userCollection = firestoreDb.collection("users");
    const usersByEmail = await userCollection.where("email", "==", email).get();
    // If no documents match, querySnapshot.empty will be true
    if (usersByEmail.empty) {
      return {
        doesEmailExist: false,
        emailType: null,
      };
    }
    // Get the first matching document
    const userDoc = usersByEmail.docs[0];
    const userData = userDoc.data();
    
    return {
      doesEmailExist: true,
      emailType: userData.authProvider,
    };
  }

  /* User Profile Methods */

  static async updateUserProfile(updates) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in");
      await updateProfile(user, updates);
      return user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async deleteAccount() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in");
      await deleteUser(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Password Methods */

  static async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Error Handling Methods */

  static handleError(error) {
    console.error("Auth Error:", error);
    return {
      code: error.code,
      message: error.message,
      userMessage: this.getUserFriendlyMessage(error.code),
    };
  }

  static getUserFriendlyMessage(errorCode) {
    const errorMessages = {
      "auth/user-not-found": "No account found with this email",
      "auth/wrong-password": "Incorrect password",
      "auth/email-already-in-use": "An account already exists with this email",
    };
    return errorMessages[errorCode] || "An error occurred. Please try again.";
  }
}
