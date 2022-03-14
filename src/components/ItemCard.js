import React from 'react'
import { Card, Container } from 'react-bootstrap';
import profileImg from "../images/profileImg.jpg"


export default function ItemCard(item) {
  return (
    <Container fluid="xs" className="d-flex align-items-center justify-content-center">
    <Card className="mt-4" style={{width:"300px"}}>
          <Card.Header>
            <Container className='d-flex align-items-center justify-content-between'>
              <div><h2>{item.productName}</h2></div>
              <div>
                <button><span className="material-icons">delete</span></button>
                <button>
                <span className="material-icons">edit</span>
                </button>
              </div>
            </Container>
          </Card.Header>
          <Card.Img
            variant="top"
            style={{ width: "auto", height: "140px" }}
            src={profileImg}
          />
          <Card.Body>
            <Card.Text className="text-center m-2 align-items-center justify-content-end">
              <a>Catagory: {item.productType}</a> 
              <br></br>
              <a>Price: {item.price}</a>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            Discount:{`10% off`}
          </Card.Footer>
        </Card>
        </Container>
  )
}
