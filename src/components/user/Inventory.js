import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import ItemCard from '../ItemCard';

export default function Inventory(user) {
  const { currentUser, token } = useAuth()
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchAllItems(){
    setLoading(true)
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/item/getAllItems/${user.id}`,{
          headers:{
            token: "Bearer " + token
          }
        })
        // .get(`https://growserver.herokuapp.com/item/getAllItems/${user.id}`)
        .then((res) => {
          setItems(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(()=>{
    if(token){
      fetchAllItems()
      setLoading(false)
    }
  }, [token])

  const styles = {
    wrapper:{
      padding: "4rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "2rem",
      gridAutoRows: "auto"
    },
    loading:{
      color: "blue"
    }
  }

  return (
    <div style={{width:"inherit"}}>
      <div className='d-flex align-items-center justify-content-between mt-4' >
        {currentUser.uid === user.id && <div><Link className="btn btn-primary w-100 mt-3" to='/add-item'>add item</Link></div>}
        <div><Button>sort</Button></div>
      </div>
      {loading && <h1>loading</h1>}
    {!loading && <div style={styles.wrapper}>
    {items.map(i =>{
        return(
          <ItemCard key={i._id} {...i} />
        )
      })}
      </div>}
    </div>
  )
}
