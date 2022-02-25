import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profileImage from "../images/profileImg.jpg";

export default function NavigationBar(profile) {
  
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const styles = {
    tooltip: {
      display: "flex",
      flexDirection: "column",
    },
  };
  console.log(currentUser ? currentUser : 'nouser');
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <Container>
      <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand style={{marginLeft:"1rem"}} href="/">
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
      <Navbar.Collapse className="justify-content-end" style={{marginRight:"1rem"}}>
        {!currentUser && <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Tooltip>
              <div style={styles.tooltip}>
                <strong>user</strong>
                <Link
                    to="/login"
                    className="btn btn-primary w-100 mt-3"
                  >
                    login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary w-100 mt-3"
                  >
                    signup
                  </Link>
              </div>
            </Tooltip>
          }
        >
          <Button variant="secondary">user</Button>
        </OverlayTrigger>}
        {currentUser &&
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
                {error && <Alert variant="danger">{error}</Alert>}
                {profile._id && (
                  <Link
                    to="/update-profile"
                    className="btn btn-primary w-100 mt-3"
                  >
                    Update Profile
                  </Link>
                )}
                {!profile._id && (
                  <Link
                    to="/dashbord"
                    className="btn btn-primary w-100 mt-3"
                  >
                  Profile
                  </Link>
                )}
              </div>
            </Tooltip>
          }
        >
          <Button variant="secondary">{currentUser.email}</Button>
        </OverlayTrigger>
        }
      </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
