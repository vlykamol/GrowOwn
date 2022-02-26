import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, InputGroup, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar";

export default function AddItem() {
  const productName = useRef();
  const productType = useRef();
  const price = useRef();

  const { currentUser } = useAuth();
  const [error, setEroor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const item = {
      _id: currentUser.uid,
      productName : productName.current.value,
      productType : productType.current.value,
      price : price.current.value
    };

    try {
      setEroor("");
      setLoading(true);
      axios
        .post("http://localhost:5000/item//addItem", item)
        .then((res) => {
          console.log(res.data)
          navigate("/dashbord")
        })
        .catch((error) => {
          setEroor("Failed to add an item")
          console.log(error)}) 
    } catch {
      setEroor("Failed to add an item");
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
            <h2 className="text-center mb-4">Add item to inventory</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="Product Name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={productName}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Product Type">
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  type="text"
                  ref={productType}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  ref={price}
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
