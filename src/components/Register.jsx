import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [file, setFile] = useState([]);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });
  // handle Input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // user create
  const handleUserCreate = async (e) => {
    e.preventDefault();

    const data = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    const fileData = await uploadBytesResumable(ref(storage, file.name), file);

    const link = await getDownloadURL(fileData.ref);

    await updateProfile(data.user, {
      displayName: input.name,
      photoURL: link,
    });
    await signOut(auth);
    setIsLoggedIn(false);
  };
  const handleUserLoggout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };
  return (
    <>
      {isLoggedIn ? (
        <button className="btn btn-info" onClick={handleUserLoggout}>
          Logout
        </button>
      ) : (
        <h1>You are logged Out</h1>
      )}
      <form onSubmit={handleUserCreate}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
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
        <input
          type="file"
          placeholder="photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default Register;
