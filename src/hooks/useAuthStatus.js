import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const observer = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });

    return observer;
  });

  return { loggedIn, checkingStatus };
};
