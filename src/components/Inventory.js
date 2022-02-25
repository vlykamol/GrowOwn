import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import ItemCard from './ItemCard';

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


  return (
    <div>
    <div className='d-flex align-items-center justify-content-center w-100'>
    <Link to='/add-item'>add item</Link>
    </div>
    <div className=''>
    {items.map(i =>{
        return(
          <ItemCard key={i._id} {...i} />
        )
      })}
    </div>
    </div>
  )
}
