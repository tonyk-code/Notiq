import type { User } from "firebase/auth";

export type configType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export type errorType = {
  message: string;
  visible: boolean;
};

export type Task = {
  id: string;
  title: string;
  tags: string;
  description: string;
  createdAt: string;
};

export type UserState = {
  user: User | null;
  isSetupReady: boolean;
  setupComplete: boolean;
};

export const errorMap: Record<string, string> = {
  // ---------- 🔑 Email / Password Authentication Errors ----------
  "auth/invalid-email": "Invalid email format. Please check your spelling.",
  "auth/email-already-in-use":
    "This email is already registered. Please use the Sign In option instead.",
  "auth/weak-password":
    "Password too weak. It must be at least 6 characters long.",
  "auth/missing-password": "Please enter a password to continue.",
  "auth/user-not-found":
    "Account not found. We couldn't find a user with this email address.",
  "auth/wrong-password":
    "Incorrect password. Please try again or use the 'Forgot Password' link.",
  "auth/too-many-requests":
    "Too many failed attempts. Please wait a few minutes before trying again.",
  "auth/invalid-credential": "Invalid sign-in details. Please try again.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/no-current-user": "You are not currently logged in.",

  // ---------- 🛡️ Account Security & Session Errors ----------
  "auth/requires-recent-login":
    "Security check required. Please sign in again to complete this sensitive action.",
  "auth/credential-too-old":
    "Your session has expired. Please sign in again to complete this action.",
  "auth/user-mismatch":
    "User Mismatch. The provided credentials do not match your current account.",

  // ---------- 🌐 Social / OAuth Sign-In Errors (Popups) ----------
  "auth/popup-closed-by-user":
    "Sign-In canceled. The sign-in window was closed.",
  "auth/cancelled-popup-request":
    "Another sign-in is in progress. Please finish the current attempt before starting another.",
  "auth/popup-blocked":
    "Popup Blocked. Please allow popups for this site and try again.",
  "auth/account-exists-with-different-credential":
    "This email is already registered with a different sign-in method (e.g., Google). Try signing in with the original method.",

  // ---------- 💾 Firestore / Database Errors ----------
  "permission-denied":
    "Permission Denied. You do not have the required access for this action.",
  unauthenticated: "Not Signed In. Please sign in to access this feature.",
  "not-found":
    "Resource Not Found. The item you are looking for may have been deleted.",
  unavailable:
    "Service Unavailable. Our database is temporarily unreachable. Please try again in a moment.",
  "deadline-exceeded":
    "Request Timeout. The request took too long. Please check your network and try again.",
  "resource-exhausted":
    "Too Many Requests. You are exceeding our rate limits. Please slow down your activity.",
  "invalid-argument":
    "Invalid Data. The information you provided is not valid. Please check your details.",
  "failed-precondition":
    "Operation Failed. The action cannot be performed in the current state. Try again later.",

  // ---------- ⚙️ General / Configuration Errors ----------
  "auth/network-request-failed":
    "Network Error. Please check your internet connection and try again.",
  "auth/internal-error":
    "An unexpected error occurred. Please try again in a moment.",
  "auth/operation-not-allowed":
    "Feature Disabled. This sign-in method is not currently enabled. Please contact support.",
  "auth/app-deleted":
    "App Error. The application session was interrupted. Please reload the page.",
  "auth/invalid-api-key":
    "Configuration Error. The application setup is incorrect. Please contact support immediately.",

  // ---------- 🧱 Custom App-Level Errors ----------
  NoAuth: "Not Signed In. Please sign in to access this feature.",
};
