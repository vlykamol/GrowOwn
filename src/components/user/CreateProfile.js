import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert, InputGroup, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";
import TimePicker from '@mui/lab/TimePicker';
import { TextField } from "@mui/material";


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
  const [profile, setProfile] = useState({});
  const [fTime, setFTime] = useState(null);
  const [tTime, setTTime] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    setError("");

    try {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/profile/getUser/${currentUser.uid}`)
        // .get(`https://growserver.herokuapp.com/profile/getUser/${currentUser.uid}`)
        .then((res) => {
          // console.log(res.data);
          setProfile(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
    // console.log(profile);
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    const newProfile = {
      userId: currentUser.uid,
      firstName: fNameRef.current.value ? fNameRef.current.value : profile.firstName,
      lastName: lNameRef.current.value ? lNameRef.current.value : profile.lastName,
      shopName: sNameRef.current.value,
      productType: pTypesRef.current.value,
      timings: [fTimeRef.current.children[1].children[0].value, tTimeRef.current.children[1].children[0].value],
      contactInfo: contactRef.current.value ? contactRef.current.value : profile.contactInfo,
      address: addressRef.current.value ? addressRef.current.value : profile.address,
    };

    try {
      setError("");
      setLoading(true);
      axios
        .post("http://localhost:5000/profile/addProfile", newProfile)
        // .post("https://growserver.herokuapp.com/profile/addProfile", newProfile)
        .then((res) => {
          // console.log(res.data)
          navigate("/dashbord")
        })
        .catch((error) => {
          setError("Failed to create an profile")
          console.log(error)}) 
    } catch {
      console.log('hey');
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
            <h2 className="text-center mb-4">Create Profile</h2>
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
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Product Types">
                <Form.Label>Product Types</Form.Label>
                <Form.Select
                  ref={pTypesRef}
                  required >
                  <option>Clothings</option>
                  <option>Lifestyle</option>
                  <option>Grocery</option>
                  <option>Medicines</option>
                  <option>Electronics</option>
                  <option>Toys</option>
                  <option>stationery</option>
                  <option>Food and Baverages</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Timings</Form.Label>
                <div className="d-flex justify-content-end align-items-center">
                <TimePicker
                  label="from"
                  ref={fTimeRef}
                  value = {fTime}
                  onChange={(newValue) => {
                    console.log(fTimeRef.current.children[1].children[0].value);
                    setFTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="to"
                  ref={tTimeRef}
                  value = {tTime}
                  onChange={(newValue) => {
                    console.log(tTimeRef.current.children[1].children[0].value);
                    setTTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </div>
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
