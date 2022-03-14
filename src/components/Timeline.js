import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import NavigationBar from './NavigationBar'
import ProfileCard from './ProfileCard'
import '.././css/styles.css';
import Footer from './Footer';

export default function Timeline() {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  const { token } = useAuth()
  // const navigate = useNavigate();

  async function fetchAllProfiles(){
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/profile/getAllProfiles`,{
          headers:{
            token: "Bearer " + token
          }
        })
        // .get(`https://growserver.herokuapp.com/profile/getAllProfiles`)
        .then((res) => {
          setProfile(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(() => {
    if(token){
      fetchAllProfiles()
    }
  }, [token])

  function searchlocation() {
    console.log("search bar");
  }

  return (
    <div className="timeline">
    <NavigationBar />
    <div className='timeline-heading'>
      <h1>
        Shops near you
      </h1>
      <Button className='btn-light d-flex align-items-center' onClick={searchlocation}>
        or choose location
        <span className="material-icons">
          my_location
        </span>
      </Button>
      {error && <Alert variant='danger'>{error}</Alert>}
    </div>
    <Container className='timeline-container'>
      {profile.map(p =>{
        return(
          <ProfileCard key={p._id} profile={p} />
        )
      })}
    </Container>
    <Footer/>
    </div>
  )
}
