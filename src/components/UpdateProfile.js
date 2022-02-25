import React, { useEffect, useRef, useState } from "react";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  async function fetchData() {
    setError("");

    try {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/profile/getProfile/${currentUser.uid}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
          console.log(profile);
        });
    } catch {
      setError("Failed to get data");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const newprofile = {
      firstName: fNameRef.current.value ? fNameRef.current.value : profile.firstName,
      lastName: lNameRef.current.value ? lNameRef.current.value : profile.lastName,
      shopName: sNameRef.current.value ? sNameRef.current.value : profile.shopName,
      productType: pTypesRef.current.value ? pTypesRef.current.value : profile.shopName,
      timings: [fTimeRef.current.value ? fTimeRef.current.value : profile.timings[0], tTimeRef.current.value ? fTimeRef.current.value : profile.timings[1]],
      contactInfo: contactRef.current.value ? contactRef.current.value : profile.contactInfo,
      address: addressRef.current.value ? addressRef.current.value : profile.address,
    };
    try {
      setError("");
      setLoading(true);
      console.log(currentUser.uid);
      axios
        .post(`http://localhost:5000/profile/updateProfile/${currentUser.uid}`, newprofile)
        .then((res) => {
          console.log(res.data)
          navigate("/")
        })
        .catch((error) => {
          setError("Failed to create an profile")
          console.log(error)}) 
    } catch {
      setError("Failed to create an profile");
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
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="First Name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={fNameRef}
                  placeholder={profile.firstName}
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Last Name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lNameRef}
                  placeholder={profile.lastName}
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Shop Name">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={sNameRef}
                  placeholder={profile.shopName}
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Product Types">
                <Form.Label>Product Types</Form.Label>
                <Form.Control
                  type="text"
                  ref={pTypesRef}
                  placeholder={profile.productType}
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Timings">
                <Form.Label>Timings</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>from</InputGroup.Text>
                  <Form.Control
                    type="text"
                    ref={fTimeRef}
                    placeholder={profile.timings[0]}
                  ></Form.Control>
                  <InputGroup.Text>To</InputGroup.Text>
                  <Form.Control
                    type="text"
                    ref={tTimeRef}
                    placeholder={profile.timings[1]}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>

              <Form.Group id="Contact">
                <Form.Label>Contact details</Form.Label>
                <Form.Control
                  type="text"
                  ref={contactRef}
                  placeholder={profile.contactInfo}
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  ref={addressRef}
                  placeholder={profile.address}
                ></Form.Control>
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
    </>
  );
}
