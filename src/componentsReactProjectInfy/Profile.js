import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((response) => {
        setUserProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => alert("Something went wrong"));
  }, []);

  return (
    <div
      className="container"
      style={{
        width: "700px",
        background: "#7CB9E8",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <h2> Profile List</h2>
      <p>{userProfile.username}</p>
      <p>{userProfile.useremail}</p>
      <p>{userProfile.userphn}</p>
      <p>{userProfile.userpwd}</p>
    </div>
  );
};
export default Profile;
