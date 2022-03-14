import React from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profileImg.jpg"
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '.././css/profileCardStyles.css'

export default function ProfileCard(props) {
  
  const navigate = useNavigate();

  function handleChange(){
    navigate(`/seller-profile/${props.profile._id} `)
  }
  return (
    <Container fluid="xs"
      className="d-flex align-items-center justify-content-center"
    >
      <div>
        <Card>
          <Card.Header>
            <span className="material-icons">
            store
            </span>
            <h3>. {props.profile.shopName}</h3>
          </Card.Header>
          <Card.Img 
            onClick={handleChange}
            variant="top"
            style={{ width: "auto", height: "140px" }}
            src={profileImg}
          />
          <Card.Body >
            <Card.Text className="text-start m-2">
              Owner : {props.profile.firstName} {props.profile.lastName}
            </Card.Text>
            <Card.Text className="text-start m-2">
              Catagory : {props.profile.productType}{" "}
            </Card.Text>

            <Card.Text className="text-start m-2">
              Contact : {props.profile.contactInfo}
              <CallIcon/>
            </Card.Text>
            <Card.Text className="text-start m-2">
              Address : {props.profile.address}
              <LocationOnIcon onClick={()=>{
                console.log("location");
              }}/>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex ">
            <span className="material-icons">
              token
            </span>
            <div>{props.profile.badge}</div>
            </div>
            <div> total sales: {props.profile.totalSales}</div>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}
