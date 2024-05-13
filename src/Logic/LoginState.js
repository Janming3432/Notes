import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const handleLoginSubmission = async (
  e,
  setLoggedIn,
  setShowEle,
  setError,
  emailValue,
  passValue
) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, emailValue, passValue);
    // const user = credentials.user;
    setLoggedIn("Logout");
    setShowEle(-1);
    window.location.reload();
  } catch (err) {
    setError(err.code.slice(5, err.code.length));
  }
};

const handleCreationSubmission = async (
  e,
  setLoggedIn,
  setShowEle,
  setError,
  emailValue,
  passValue
) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, emailValue, passValue);
    // const user = credentials.user;
    setLoggedIn("LogOut");
    setShowEle(-1);
    window.location.reload();
  } catch (err) {
    setError(err.code.slice(5, err.code.length));
  }
};

const handleLogin = async (loggedIn, setShowEle, setLoggedIn) => {
    if (loggedIn === "Login") setShowEle(0);
    else {
    //   await auth.signOut().then(() => {
    //     setLoggedIn("Login");
    //   });
      await auth.signOut();
    }
};

export { handleLogin, handleCreationSubmission, handleLoginSubmission};