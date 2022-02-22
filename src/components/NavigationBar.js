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

export default function NavigationBar() {

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const styles = {
    tooltip: {
      display: "flex",
      flexDirection: "column",
    },
  };
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
                {error && <Alert variant="danger">{error}</Alert>}
                {profile._id && (
                  <Link
                    to="/create-profile"
                    className="btn btn-primary w-100 mt-3"
                  >
                    Update Profile
                  </Link>
                )}
              </div>
            </Tooltip>
          }
        >
          <Button variant="secondary">{currentUser.email}</Button>
        </OverlayTrigger>
      </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
