import { async } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";

export default function RequestCard(user) {
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [response, setResponse] = useState([1]);
  const sellerID = user.id;
  let responseId;
  let affId;
  async function fetchRequests() {
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/request/getAllRequests/${sellerID}`)
        // .get(`https://growserver.herokuapp.com/profile/getProfile/${userID}`)
        .then((res) => {
          // console.log(res.data);
          setRequests(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function HandleAcceptResponse(req) {
    console.log(req);
    await axios
      .post(`http://localhost:5000/response/createResponse/${sellerID}`, {
        affId: req.affId,
      })
      .then((res) => {
        responseId = res.data._id;
        affId = req._id;
        updateRequest()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateRequest() {
    await axios
      .post(`http://localhost:5000/request/updateRequest/${affId}`, {
        resId: responseId,
        isAccepted: true,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRejectResponse(req) {
    console.log(req);
  }

  return (
    <Container fluid="md">
      <Card>
        <Card.Header>Requests</Card.Header>
        <Card.Body>
          <ListGroup as="ul">
            {requests.map((req) => {
              // console.log(req.userId);
              return (
                <ListGroup.Item key={req._id}>
                  <div className="d-flex align-items-center justify-content-between">
                    {req.reqName} requested for promo codes
                    <div className="d-flex align-items-center justify-content-center">
                      <button onClick={() => HandleAcceptResponse(req)}>
                        <span className="material-icons">done</span>
                      </button>
                      <button onClick={() => handleRejectResponse(req)}>
                        <span className="material-icons">clear</span>
                      </button>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
