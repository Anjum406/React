import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUserList(response.data);
        console.log("I'm useEffect");
      })
      .catch((error) => alert("Something went wrong"));
  }, []);

  function handleProfile(id) {
    navigate(`/profile/${id}`);
  }
  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/users/${id}`)
      .then((response) => {
        alert(`User with ${id} is deleted`);
        setUserList(userList.filter((data) => data.id !== id));
      })
      .catch((error) => alert(`User with Id ${id} can't be deleted`));
  }
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
      <h2>View Profile List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email Id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr>
                <td>{user.username}</td>
                <td>{user.useremail}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleProfile(user.id);
                    }}
                  >
                    View{" "}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleDelete(user.id);
                    }}
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
  );
};
export default List;
