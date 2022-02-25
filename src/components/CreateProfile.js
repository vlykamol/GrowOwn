import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, InputGroup, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";

export default function CreateProfile() {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const sNameRef = useRef();
  const pTypesRef = useRef();
  const fTimeRef = useRef();
  const tTimeRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const { currentUser } = useAuth();
  const [error, setEroor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const profile = {
      userId: currentUser.uid,
      firstName: fNameRef.current.value,
      lastName: lNameRef.current.value,
      shopName: sNameRef.current.value,
      productType: pTypesRef.current.value,
      timings: [fTimeRef.current.value, tTimeRef.current.value],
      contactInfo: contactRef.current.value,
      address: addressRef.current.value,
    };

    try {
      setEroor("");
      setLoading(true);
      axios
        .post("http://localhost:5000/profile/addProfile", profile)
        .then((res) => {
          console.log(res.data)
          navigate("/dashbord")
        })
        .catch((error) => {
          setEroor("Failed to create an profile")
          console.log(error)}) 
    } catch {
      console.log('hey');
      setEroor("Failed to create an profile");
    }
    setLoading(false);
  }

  return (
    <>
    <NavigationBar/>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Create Profile</h2>
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

              <Form.Group id="Shop Name">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={sNameRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Product Types">
                <Form.Label>Product Types</Form.Label>
                <Form.Control
                  type="text"
                  ref={pTypesRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Timings">
                <Form.Label>Timings</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>from</InputGroup.Text>
                  <Form.Control
                    type="text"
                    ref={fTimeRef}
                    required
                  ></Form.Control>
                  <InputGroup.Text>To</InputGroup.Text>
                  <Form.Control
                    type="text"
                    ref={tTimeRef}
                    required
                  ></Form.Control>
                </InputGroup>
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

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Create Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
    </>
  );
}
