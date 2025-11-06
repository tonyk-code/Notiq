import { useMutation } from "@tanstack/react-query";
import { auth, db } from "../../config/FirebaseConfig";
import "./SetupPage.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function SetupPage() {
  const navigate = useNavigate();

  const setupDoc = async (): Promise<void> => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("No authenticated user (uid is undefined)");
    }
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(
        userRef,
        {
          createdAt: new Date(),
        },
        { merge: true }
      );
    }
  };

  const { mutate } = useMutation({
    mutationFn: setupDoc,
    onSuccess: () => {
      navigate("/Home page");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        if (error instanceof FirebaseError) {
          console.error("Firebase setup error:", error.code);
        }
      }
    },
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) mutate();
      else navigate("/");
    });

    return () => unsub();
  }, [navigate, mutate]);

  return (
    <div className="loader-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="200px"
        width="200px"
        viewBox="0 0 200 200"
        className="pencil"
      >
        <defs>
          <clipPath id="pencil-eraser">
            <rect height="30" width="30" ry="5" rx="5"></rect>
          </clipPath>
        </defs>
        <circle
          transform="rotate(-113,100,100)"
          strokeLinecap="round"
          strokeDashoffset="439.82"
          strokeDasharray="439.82 439.82"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          r="70"
          className="pencil__stroke"
        ></circle>
        <g transform="translate(100,100)" className="pencil__rotate">
          <g fill="none">
            <circle
              transform="rotate(-90)"
              strokeDashoffset="402"
              strokeDasharray="402.12 402.12"
              strokeWidth="30"
              stroke="hsl(223,90%,50%)"
              r="64"
              className="pencil__body1"
            ></circle>
            <circle
              transform="rotate(-90)"
              strokeDashoffset="465"
              strokeDasharray="464.96 464.96"
              strokeWidth="10"
              stroke="hsl(223,90%,60%)"
              r="74"
              className="pencil__body2"
            ></circle>
            <circle
              transform="rotate(-90)"
              strokeDashoffset="339"
              strokeDasharray="339.29 339.29"
              strokeWidth="10"
              stroke="hsl(223,90%,40%)"
              r="54"
              className="pencil__body3"
            ></circle>
          </g>
          <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
            <g className="pencil__eraser-skew">
              <rect
                height="30"
                width="30"
                ry="5"
                rx="5"
                fill="hsl(223,90%,70%)"
              ></rect>
              <rect
                clipPath="url(#pencil-eraser)"
                height="30"
                width="5"
                fill="hsl(223,90%,60%)"
              ></rect>
              <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
              <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
              <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
              <rect
                height="2"
                width="30"
                y="6"
                fill="hsla(223,10%,10%,0.2)"
              ></rect>
              <rect
                height="2"
                width="30"
                y="13"
                fill="hsla(223,10%,10%,0.2)"
              ></rect>
            </g>
          </g>
          <g
            transform="rotate(-90) translate(49,-30)"
            className="pencil__point"
          >
            <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)"></polygon>
            <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
            <polygon
              points="15 0,20 10,10 10"
              fill="hsl(223,10%,10%)"
            ></polygon>
          </g>
        </g>
      </svg>

      <p className="app-setup-spinner-message">Setting up your app...</p>
    </div>
  );
}
