/* Container displaying all the users */
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import User from "../components/User";
import Loader from "../components/Loader";
import { getUserData } from "../services/apiService";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  //fetch user data from API
  useEffect(() => {
    getUserData()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
  //function to update user data
  const updateUserData = (id, userData) => {
    setUsers((prevState) =>
      prevState.map((item) => {
        if (item.id === id) return { ...item, ...userData };
        return item;
      })
    );
  };
  //function to delete user from array
  const deleteUser = (id) => {
    //if the user exists then remove from array
    if (id > -1) {
      setUsers((prevState) => prevState.filter((item) => item.id !== id));
    }
  };
  //Show loader if users array length is 0
  if (!users.length) {
    return <Loader />;
  }

  return (
    <Row>
      {users.map((user) => (
        <Col xs={24} sm={24} md={8} lg={8} xl={6} key={user.id}>
          <User
            user={user}
            updateUserData={updateUserData}
            deleteUser={deleteUser}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Homepage;
