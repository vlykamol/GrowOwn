import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import NavigationBar from "./NavigationBar";
import Inventory from "./user/Inventory";
import RequestCard from "./RequestCard";
import ResponseCard from "./ResponseCard";
import RedeemCard from "./RedeemCard";

export default function Dashbord() {
  const [error, setError] = useState("");
  const { currentUser, token } = useAuth();
  const [profile, setProfile] = useState({});
  const userID = currentUser.uid;

  console.log('token', token);
  
  async function fetchData() {
    setError("");
      await axios
        .get(`http://localhost:5000/profile/getProfile/${userID}`,{
          headers:{
            token: "Bearer " + token
          }
        })
        // .get(`https://growserver.herokuapp.com/profile/getProfile/${userID}`)
        .then((res) => {
          setProfile(res.data);
        }).catch((err) =>{
          setError("Failed to get data")
        })
  }

  useEffect(() => {
    if(token){
      fetchData()
    }
  }, [token])

  const styles = {
    Container: {
      marginTop: "8rem",
      marginBottom: "8rem",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div style={styles.Container}>
      <NavigationBar/>
      {!profile._id && <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong>
              {currentUser.email}
              <Link to="/create-profile" className="btn btn-primary w-100 mt-3">
                Create Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
          </div>
        </div>
      </Container>}
      {/* {profile._id && <ProfileCard profile={profile} />} */}
      {profile._id &&
      <Container fluid="lg" className="d-flex align-items-center justify-content-between" style = {{paddingLeft:"4rem", paddingRight:"4rem"}}>
        <ProfileCard profile={profile} />
        <Container>
        <RequestCard id = {userID}/>
        <RedeemCard profile={profile}/>
        </Container>
      </Container>
      }
      <ResponseCard id = {userID}/>
      <Container fluid="xl" className="d-flex align-items-center justify-content-center">
        <Inventory id = {userID}/>
      </Container>
    </div>
  );
}
