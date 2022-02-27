import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import NavigationBar from './NavigationBar'
import ProfileCard from './ProfileCard'

export default function Timeline() {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  // const navigate = useNavigate();

  async function fetchAllProfiles(){
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/profile/getAllProfiles`)
        .then((res) => {
          setProfile(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(() => {
    fetchAllProfiles()
  }, [])

  const styles = {
    Container: {
      marginTop: "8rem",
      marginBottom: "8rem",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <>
    <NavigationBar />
    {error && <Alert variant='danger'>{error}</Alert>}
    <Container className='d-flex justify-content-center align-items-cnter' style={styles.Container}>
      {profile.map(p =>{
        return(
          <ProfileCard  key={p._id} profile={p} />
        )
      })}
    </Container>
    </>
  )
}
