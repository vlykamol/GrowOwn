import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown, ListGroup } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function ResponseCard(user) {
  const [error, setError] = useState("");
  const [response, setResponse] = useState([]);
  const { token } = useAuth()
  const affID = user.id;
  let sellerId;
  async function fetchResponses() {
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/response/getAllResponses/${affID}`,{
          headers:{
            token: "Bearer " + token
          }
        })
        .then((res) => {
          setResponse(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(() => {
    if(token){
      fetchResponses();
    }
  }, [token]);

  return (
    <Container fluid="md">
      {response.length !== 0 && <Card>
        <Card.Header>responses</Card.Header>
        <Card.Body>
          <ListGroup as="ul">
            {response.map((res) => {
              return (
                <Dropdown className="d-flex align-items-center justify-content-between" key={res._id}>
                  {res.sellerId} assigned promo codes
                  <Dropdown.Toggle id="dropdown-basic">
                    codes:
                  </Dropdown.Toggle>
                  {
                    <Dropdown.Menu>
                    {res.codes.map((c) => {
                      return(
                        <Dropdown.Item>{c}</Dropdown.Item>
                      )
                    })}
                    </Dropdown.Menu>
                  }
                </Dropdown>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>}
    </Container>
  );
}
