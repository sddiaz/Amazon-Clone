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
import { app } from "../../lib/firebase/config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default class AuthService {

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

  static async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    // Customize error handling based on error codes
    console.error("Auth Error:", error);
    return {
      code: error.code,
      message: error.message,
      // Map Firebase error codes to user-friendly messages
      userMessage: this.getUserFriendlyMessage(error.code),
    };
  }

  static getUserFriendlyMessage(errorCode) {
    const errorMessages = {
      "auth/user-not-found": "No account found with this email",
      "auth/wrong-password": "Incorrect password",
      "auth/email-already-in-use": "An account already exists with this email",
      // Add more error mappings as needed
    };
    return errorMessages[errorCode] || "An error occurred. Please try again.";
  }
}
