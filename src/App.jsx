import { useEffect, useState } from "react";
import Register from "./components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("User not found");
      }
    });
    return () => authState();
  });
  return (
    <>
      {isLoggedIn && (
        <>
          <img src={isLoggedIn.photoURL} alt="" />
          <h1>{isLoggedIn.email}</h1>
          <p>{isLoggedIn.displayName}</p>
        </>
      )}
      <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <br />
      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
