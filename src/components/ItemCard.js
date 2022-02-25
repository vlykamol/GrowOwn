import React from 'react'
import { Card } from 'react-bootstrap';
import profileImg from "../images/profileImg.jpg"


export default function ItemCard(item) {
  return (
    <Card className="w-50 mt-4">
          <Card.Header>
            <h2>{item.productName}</h2>
          </Card.Header>
          <Card.Img
            variant="top"
            style={{ width: "350px", height: "140px" }}
            src={profileImg}
          />
          <Card.Body>
            <Card.Text className="text-center m-2">
              {item.productType} {item.price}
            </Card.Text>
          </Card.Body>
        </Card>
  )
}
