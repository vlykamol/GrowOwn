import axios from 'axios';
import { func } from 'prop-types';
import React, { useRef, useState } from 'react'
import { Card, Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';

export default function RedeemCard(props) {
  const affiliateNameRef = useRef();
  const promoCodeRef = useRef();
  const { currentUser, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState('danger');


  async function handlesubmit(e) {
    e.preventDefault();
    const affID = affiliateNameRef.current.value;
    const sellerId = currentUser.uid;

    setLoading(true);
    await axios.get(`http://localhost:5000/response/checkResponse/${affID}/${sellerId}`,{
      headers:{
        token: "Bearer " + token
      }
    }).then((res)=>{
      isValidCode(res.data[0].codes)
    }).catch((err)=>{
      console.log(err);
    })
    setLoading(false);
  }

  function isValidCode(codes){
    const c = codes.find(c => c === promoCodeRef.current.value)
    if(c) {
      setAlert('success')
      setMessage("code is valid");
      onCodeValid(c)
    }
    else {
      setAlert('danger')
      setMessage("code is invalid");
    }
  }

  async function onCodeValid(code){
    const affID = affiliateNameRef.current.value;
    const sellerId = currentUser.uid;

    await axios.post(`http://localhost:5000/response/removeCode/${affID}/${sellerId}`, {code: code, totalSales: props.profile.totalSales}).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <Container>
      <Card>
        <Card.Body>
        {message && <Alert variant={alert}>{message}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id='affiliateName'>
            <Form.Label>Affiliate Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={affiliateNameRef}
                ></Form.Control>
            </Form.Group>

            <Form.Group id='promoCode'>
            <Form.Label>Promo Code</Form.Label>
                <Form.Control
                  type="text"
                  ref={promoCodeRef}
                ></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Apply Code
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
