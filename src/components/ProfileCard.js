import React from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profileImg.jpg"

export default function ProfileCard(props) {
  const navigate = useNavigate();

  function handleChange(){
    navigate(`/seller-profile/${props.profile._id} `)
  }
  return (
    <Container fluid="xs"
      className="d-flex align-items-center justify-content-center"
      // style={{ minHeight: "100vh" }}
    >
      <div>
        <Card onClick={handleChange} className="w-100 mt-4">
          <Card.Header>
            <h2>{props.profile.shopName}</h2>
          </Card.Header>
          <Card.Img
            variant="top"
            style={{ width: "350px", height: "140px" }}
            src={profileImg}
          />
          <Card.Body>
            <Card.Text className="text-center m-2">
              {props.profile.firstName} {props.profile.lastName}
            </Card.Text>
            <Card.Text className="text-center m-2">
              {props.profile.productType}{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Text className="text-center m-2">
              {props.profile.contactInfo}
            </Card.Text>
            <Card.Text className="text-center m-2">
              {props.profile.address}
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}
