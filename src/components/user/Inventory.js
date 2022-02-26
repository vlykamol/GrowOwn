import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import ItemCard from '../ItemCard';

export default function Inventory() {
  const { currentUser} = useAuth();
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  async function fetchAllItems(){
    setError("");
    try {
      await axios
        .get(`http://localhost:5000/item/getAllItems/${currentUser.uid}`)
        .then((res) => {
          setItems(res.data);
        });
    } catch {
      setError("Failed to get data");
    }
  }

  useEffect(()=>{
    fetchAllItems()
  }, [])

  const styles = {
    wrapper:{
      padding: "4rem",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "2rem",
      gridAutoRows: "auto"
    }
  }

  return (
    <div style={{width:"inherit"}}>
      <div className='d-flex align-items-center justify-content-between mt-4' >
        <div><Link className="btn btn-primary w-100 mt-3" to='/add-item'>add item</Link></div>
        <div><Button>sort</Button></div>
      </div>
    <div style={styles.wrapper}>
    {items.map(i =>{
        return(
          <ItemCard key={i._id} {...i} />
        )
      })}
      </div>
    </div>
  )
}
