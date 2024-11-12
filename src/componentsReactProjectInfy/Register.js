import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    useremail: "",
    userphn: "",
    userpwd: "",
  });

  const navigate = useNavigate();
  const [phnerr, setphnerr] = useState("");

  function handleData(event) {
    let name = event.target.name;
    let value = event.target.value;
    setUserData({ ...userData, [name]: value });
    validation(name, value);
  }

  function validation(name, value) {
    if (name === "userphn") {
      if (value.length !== 10) {
        setphnerr("Mobile number should be 10 digit");
      } else {
        setphnerr("");
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      userData.username === "" ||
      userData.useremail === "" ||
      userData.userphn === "" ||
      userData.userpwd === ""
    ) {
      alert("All fields are required");
    } else {
      axios
        .post("http://localhost:4000/users", userData)
        .then((response) => {
          alert(`Your UserId is: ${response.data.id} `);
          navigate("./list");
        })
        .catch((err) => alert("Something went wrong"));
    }
  }

  return (
    <div id="all">
      <h3>Event Registration</h3>
      <div
        className="container"
        style={{
          width: "500px",
          backgroundColor: "grey",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label className="form-label">Username :</label>
          <input
            type="text"
            placeholder="Enter username"
            className="form-control"
            name="username"
            value={userData.username}
            onChange={(event) => handleData(event)}
          />
          <br /> <label className="form-label">Email ID :</label>
          <input
            type="text"
            placeholder="Enter Email Id"
            className="form-control"
            name="useremail"
            value={userData.useremail}
            onChange={(event) => handleData(event)}
          />
          <br /> <label className="form-label">Mobile Number :</label>
          <input
            type="number"
            placeholder="Enter Mobile number"
            className="form-control"
            name="userphn"
            value={userData.userphn}
            onChange={(event) => handleData(event)}
          />
          {phnerr ? <span>{phnerr}</span> : null};
          <br /> <label className="form-label">Password :</label>
          <input
            type="text"
            placeholder="Enter password"
            className="form-control"
            name="userpwd"
            value={userData.userpwd}
            onChange={(event) => handleData(event)}
          />
          <br />
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
