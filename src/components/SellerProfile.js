import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Alert, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import NavigationBar from "./NavigationBar";
import Inventory from "./user/Inventory";
import Button from "@restart/ui/esm/Button";

export default function SellerProfile() {
  const [error, setError] = useState("");
  const { currentUser, currentUserP, token } = useAuth();
  const [profile, setProfile] = useState({});
  const { profileId } = useParams();

  async function fetchData() {
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/profile/getProfile/${profileId}`,{
          headers:{
            token: "Bearer " + token
          }
        })
        // .get(`https://growserver.herokuapp.com/profile/getProfile/${profileId}`)
        .then((res) => {
          // console.log(res.data);
          setProfile(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(() => {
    if(token){
      fetchData()
    }
  }, [token])

  async function handleRequest(){
    console.log(currentUserP);
    const req = {
      sellerId: profileId,
      reqName: currentUserP.firstName,
      quantity: 10,
      isAccepted: false,
    }
    console.log(currentUser.uid);
    await axios.post(`http://localhost:5000/request/postRequest/${currentUser.uid}`, req).then((res) => {
      console.log('request submitted');
    }).catch((err) => {
      console.log('failed to send request');
    })
  }

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
      <Container fluid="md" className="d-flex align-items-center justify-content-between">
        <ProfileCard profile={profile} />
        {currentUser.role === "affiliate" && 
          <Button onClick={handleRequest} className="mt-4">Request for coupons</Button>
        }
      </Container>
      }
      <Container fluid="xl" className="d-flex align-items-center justify-content-center">
        <Inventory id = {profileId}/>
      </Container>
    </div>
  );
}
