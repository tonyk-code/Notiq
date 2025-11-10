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
  "auth/invalid-user-token": "Invalid session. Please sign in again.",
  "auth/user-token-expired": "Session expired. Please sign in again.",
  "auth/id-token-expired":
    "Your login token has expired. Please reauthenticate.",
  "auth/session-cookie-expired":
    "Your session cookie has expired. Please sign in again.",

  // ---------- 🌐 Social / OAuth Sign-In Errors (Popups) ----------
  "auth/popup-closed-by-user":
    "Sign-In canceled. The sign-in window was closed.",
  "auth/cancelled-popup-request":
    "Another sign-in is in progress. Please finish the current attempt before starting another.",
  "auth/popup-blocked":
    "Popup Blocked. Please allow popups for this site and try again.",
  "auth/account-exists-with-different-credential":
    "This email is already registered with a different sign-in method. Try signing in with the original method.",
  "auth/unauthorized-domain":
    "Unauthorized domain. This app domain is not allowed for OAuth sign-in.",
  "auth/operation-not-supported-in-this-environment":
    "This operation isn't supported in your browser or environment.",

  // ---------- 📱 Multi-Factor / Verification ----------
  "auth/multi-factor-auth-required":
    "Additional verification required. Please complete multi-factor authentication.",
  "auth/missing-verification-code":
    "Missing verification code. Please enter the code sent to your device.",
  "auth/invalid-verification-code":
    "Invalid verification code. Please double-check and try again.",
  "auth/missing-verification-id":
    "Verification process incomplete. Please request a new verification code.",
  "auth/invalid-verification-id":
    "Invalid verification ID. Please restart the sign-in process.",
  "auth/missing-phone-number": "Please enter a valid phone number.",
  "auth/invalid-phone-number":
    "Invalid phone number format. Please check and try again.",
  "auth/quota-exceeded":
    "Too many verification requests. Please wait before trying again.",
  "auth/code-expired":
    "Verification code has expired. Please request a new one.",

  // ---------- 💾 Firestore / Database Errors ----------
  "permission-denied":
    "Permission Denied. You do not have the required access for this action.",
  unauthenticated: "Not Signed In. Please sign in to access this feature.",
  "not-found":
    "Resource Not Found. The item you are looking for may have been deleted.",
  unavailable:
    "Service Unavailable. The database is temporarily unreachable. Please try again later.",
  "deadline-exceeded":
    "Request Timeout. The request took too long. Please check your network.",
  "resource-exhausted": "Too Many Requests. Please slow down your activity.",
  "invalid-argument": "Invalid Data. Please check your input and try again.",
  "failed-precondition": "Operation Failed. Try again later.",
  "already-exists": "This record already exists.",
  aborted: "Operation aborted due to a conflict. Try again later.",
  cancelled: "Operation canceled before completion.",
  "data-loss": "Data Loss. The data could not be processed.",
  internal: "Internal Firestore error. Please try again later.",
  unimplemented:
    "Feature not supported by the current Firestore configuration.",

  // ---------- ☁️ Cloud Functions Errors ----------
  "functions/invalid-argument":
    "Invalid function argument. Please check your input data.",
  "functions/failed-precondition":
    "Function cannot run in the current state. Try again later.",
  "functions/out-of-range": "Out-of-range input value provided.",
  "functions/unauthenticated": "Authentication required. Please sign in.",
  "functions/permission-denied":
    "You do not have permission to perform this action.",
  "functions/not-found": "Function not found. Please contact support.",
  "functions/aborted": "Function aborted. Try again later.",
  "functions/already-exists": "The requested resource already exists.",
  "functions/resource-exhausted":
    "Too many requests. Please wait and try again.",
  "functions/cancelled": "Function canceled.",
  "functions/data-loss": "Data could not be processed by the function.",
  "functions/unknown": "An unknown function error occurred.",
  "functions/internal": "Internal server error in cloud function.",
  "functions/unavailable": "Function service temporarily unavailable.",
  "functions/deadline-exceeded":
    "Function took too long to respond. Please try again.",

  // ---------- 📦 Firebase Storage Errors ----------
  "storage/object-not-found":
    "File not found. It may have been deleted or moved.",
  "storage/unauthorized": "You don't have permission to access this file.",
  "storage/canceled": "File upload canceled.",
  "storage/unknown": "An unknown error occurred during the storage operation.",
  "storage/quota-exceeded":
    "Storage quota exceeded. Please delete unused files.",
  "storage/invalid-checksum":
    "File upload failed due to corruption. Please try again.",
  "storage/retry-limit-exceeded":
    "Network too unstable. Upload failed after multiple attempts.",
  "storage/invalid-argument":
    "Invalid file or metadata. Please verify your input.",

  // ---------- ⚙️ General / Configuration Errors ----------
  "auth/network-request-failed":
    "Network Error. Please check your internet connection.",
  "auth/internal-error":
    "An unexpected error occurred. Please try again later.",
  "auth/operation-not-allowed":
    "This authentication method is not enabled. Please contact support.",
  "auth/app-deleted":
    "App Error. The application session was interrupted. Please reload.",
  "auth/invalid-api-key":
    "Configuration Error. The application setup is invalid.",
  "auth/missing-api-key":
    "Missing API Key in configuration. Please contact support.",
  "auth/invalid-tenant-id": "Invalid tenant configuration.",
  "auth/timeout": "Operation timed out. Please try again.",
  "auth/web-storage-unsupported":
    "Browser does not support persistent login (cookies or storage disabled).",
  "auth/argument-error": "An invalid argument was provided to a Firebase call.",
  "auth/unexpected-error": "Unexpected authentication error occurred.",

  // ---------- 🧱 Custom App-Level Errors ----------
  NoAuth: "Not Signed In. Please sign in to access this feature.",
  Unknown: "An unknown error occurred. Please try again later.",
  ServerError: "Server error. Please refresh or try again later.",
  ValidationError:
    "Invalid input detected. Please correct your data and try again.",
  Timeout:
    "The request took too long to respond. Please check your connection.",
};
