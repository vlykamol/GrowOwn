import React from 'react'
import { Card, Container } from 'react-bootstrap';
import profileImg from "../images/profileImg.jpg"


export default function ItemCard(item) {
  return (
    <div>
    <Card className="mt-4">
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
            style={{ width: "350px", height: "140px" }}
            src={profileImg}
          />
          <Card.Body>
            <Card.Text className="text-center m-2 align-items-center justify-content-end">
              <a>Catagory: {item.productType}</a> 
              <a>Price: {item.price}</a>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            Discount:{`10% off`}
          </Card.Footer>
        </Card>
        </div>
  )
}
