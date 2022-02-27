import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavigationBar from "../NavigationBar";

export default function Signup() {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser, addProfile } = useAuth();
  const [error, setEroor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = {
    role: '',
    ID : 123
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setEroor("Password do not match");
    }
    try {
      setEroor("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then((res)=>{
        addProfile({
          userId: res.user._delegate.uid,
          firstName: fNameRef.current.value,
          lastName: lNameRef.current.value,
          email: emailRef.current.value,
          role: roleRef.current.value,
          contactInfo: contactRef.current.value,
          address: addressRef.current.value,
        })
      })
      navigate("/");
    } catch(e) {
      console.log(e)
      setEroor("Failed to create new user");
    }
    setLoading(false);
  }

  return (
    <>
    <NavigationBar {...user}/>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id="First Name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={fNameRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Last Name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lNameRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="role">
                <Form.Label>Join as a</Form.Label>
                <Form.Select
                  ref={roleRef}
                  required
                >
                  <option>seller</option>
                  <option>affiliate</option>
                </Form.Select>
              </Form.Group>

              <Form.Group id="Contact">
                <Form.Label>Contact details</Form.Label>
                <Form.Control
                  type="text"
                  ref={contactRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  ref={addressRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="password-confirm">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
    </>
  );
}
