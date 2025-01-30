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
import { arrayUnion } from "firebase/firestore";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default class FirebaseService {
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

  /* Product and Order Methods */

  static async getProductOrderInfo(id) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    try {
      // Run both queries in parallel using Promise.all
      const [totalOrdersSnapshot, recentOrdersSnapshot] = await Promise.all([
        // Query 1: Get total orders count
        firestoreDb
          .collection("orders")
          .where("products", "array-contains", id)
          .get(),

        // Query 2: Get last month's orders count
        firestoreDb
          .collection("orders")
          .where("products", "array-contains", id)
          .where("orderDate", ">=", oneMonthAgo)
          .get(),
      ]);

      const totalOrderDocs = totalOrdersSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id, // This adds the document ID to each document
        };
      });

      const recentOrderDocs = recentOrdersSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id, // This adds the document ID to each document
        };
      });

      return {
        totalOrders: totalOrderDocs.length,
        recentOrders: recentOrderDocs.length,
      };
    } catch (error) {
      // Handle index building error gracefully
      if (error.message.includes("requires an index")) {
        console.error("Firestore index is being built. Please wait...");
        return { totalOrders: 0, lastMonthOrders: 0 };
      }
      throw error;
    }
  }

  static async addItemToCart(userId, productId, quantity) {
    // Get current user
    const userRef = firestoreDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    try {
      if (userDoc.exists) {
        const userData = userDoc.data();
        const cart = userData.cart;

        const existingItemIndex = cart.findIndex(
          (product) => product.productId === productId
        );

        if (existingItemIndex !== -1) {
          // Item exists - update its quantity
          cart[existingItemIndex].quantity += quantity;

          // Update the entire cart array in Firestore
          await userRef.update({
            cart: cart,
          });

          return true;
        } else {
          // Item doesn't exist - add new item
          await userRef.update({
            cart: arrayUnion({
              productId: productId,
              quantity: quantity,
            }),
          });
          return true;
        }
      } else {
        throw new Error("User Not Found.");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
