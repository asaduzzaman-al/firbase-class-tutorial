import React from "react";
import { useEffect, useState } from "react";
import "../App.css";
import { createDoc, deletedata, getRealTimeData } from "../firebase/database";
import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const Devs = () => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    skill: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });
  const [devs, setDevs] = useState([]);
  const [file, setFile] = useState([]);
  // console.log(file);
  // handle Input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // handleDocCreate
  const handleDocCreate = async (e) => {
    e.preventDefault();
    const fileData = await uploadBytesResumable(ref(storage, file.name), file);
    console.log(fileData);
    const link = await getDownloadURL(fileData.ref);
    console.log(link);
    await createDoc("devs", { ...input, photo: link });
    setInput({
      name: "",
      age: "",
      skill: "",
    });
  };
  // delete data
  const handleDataDelete = async (id) => {
    await deletedata("devs", id);
  };
  useEffect(() => {
    getRealTimeData("devs", setDevs);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <form onSubmit={handleDocCreate}>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="age"
              name="age"
              value={input.age}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="skill"
              name="skill"
              value={input.skill}
              onChange={handleInputChange}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
            <br />
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Skill</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {devs?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.skill}</td>
                        <td>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            src={item.photo}
                            alt=""
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDataDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devs;
