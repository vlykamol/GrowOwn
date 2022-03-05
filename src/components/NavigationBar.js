import React, { useState } from "react";
import { Alert, Button, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profileImage from "../images/profileImg.jpg";

export default function NavigationBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
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
      <h3 className="justify-content-centers" style={{color: "white"}}>{currentUser && currentUser.role}</h3>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end" style={{marginRight:"1rem"}}>
        {!currentUser && <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Tooltip>
              <div style={styles.tooltip}>
                feedback
                {/* <Link to='/feedback' className="btn btn-primary w-100 mt-3">
                  Feedback
                </Link> */}
              </div>
            </Tooltip>
          }
        >
          <Button variant="secondary">User</Button>
        </OverlayTrigger>}
        {currentUser &&
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Tooltip>
              <div style={styles.tooltip}>
                Logged in as 
                <strong>{currentUser.role}</strong>
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
                {error && <Alert variant="danger">{error}</Alert>}
                <Link
                    to="/dashbord"
                    className="btn btn-primary w-100 mt-3"
                  >profile
                  </Link>
                  <Link
                    to="/update-profile"
                    className="btn btn-primary w-100 mt-3"
                  >Update Profile
                  </Link>
                {!currentUser.uid && (
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
  );
}
