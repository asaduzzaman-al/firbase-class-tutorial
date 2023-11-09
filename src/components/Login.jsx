import React, { useState } from "react";
import { auth, facebookProvider, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  // handle Input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // user create
  const handleUserLogin = async (e) => {
    e.preventDefault();

    const data = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    setIsLoggedIn(data.user);
  };
  // google provider
  const handleGoogleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    setIsLoggedIn(data.user);
  };
  // google provider
  const handleFacebookLogin = async () => {
    const data = await signInWithPopup(auth, facebookProvider);
    setIsLoggedIn(data.user);
  };

  return (
    <>
      <form onSubmit={handleUserLogin}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <hr />
      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleFacebookLogin}>Facbook</button>
    </>
  );
};

export default Login;
