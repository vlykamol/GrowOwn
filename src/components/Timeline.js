import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
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

  

  return (
    <>
    <NavigationBar {...profile}/>
    {error && <Alert variant='danger'>{error}</Alert>}
      {profile.map(p =>{
        return(
          <ProfileCard key={p._id} profile={p} />
        )
      })}
    </>
  )
}
