import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Alert,
  Container,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import NavigationBar from "./NavigationBar";

export default function Dashbord() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  async function fetchData() {
    setError("");

    try {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/profile/${currentUser.uid}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <NavigationBar></NavigationBar>
      {/* <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={profileImage}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Grow Own
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Tooltip>
                  <div style={styles.tooltip}>
                  <strong>{currentUser.email}</strong>
                  <Button variant="link" onClick={handleLogout}>
                    Log Out
                  </Button>
                  {profile._id && <Link to="/create-profile" className="btn btn-primary w-100 mt-3">
                    Update Profile
                  </Link>}
                  </div>
                </Tooltip>
              }
            >
              <Button variant="secondary">{currentUser.email}</Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
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
            {/* <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button> */}
            {/* <Button variant="link" onClick={fetchData}>
              get Data
            </Button> */}
          </div>
        </div>
      </Container>}
      {profile._id && <ProfileCard profile={profile} />}
    </>
  );
}
