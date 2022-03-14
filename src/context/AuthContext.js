import axios from 'axios'
import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentuser] = useState({})
  const [currentUserP, setCurrentuserP] = useState({})
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(){
    auth.signOut()
  }

  function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
  }

  async function addProfile(user){
    try {
      axios
        .post("http://localhost:5000/profile/addUser", user)
        // .post("https://growserver.herokuapp.com/profile/addUser", user)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)}) 
    } catch {
      console.log('error in adding user to database');
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setCurrentuser(user)
        setLoading(false)
        user.getIdToken().then((token) => {
          setToken(token);
        })
      }
    })
    return unsubscribe
  }, [])

  async function fetchData() {
    await axios
      .get(`http://localhost:5000/profile/getUser/${currentUser.uid}`,{
        headers:{
          token: "Bearer " + token
        }
      })
      // .get(`https://growserver.herokuapp.com/profile/getUser/${currentUser.uid}`)
      .then((res) => {
        currentUser.role = res.data.role;
        setCurrentuserP(res.data);
      });
  }

  useEffect(()=>{
    if(token){
      fetchData()
    }
  },[token])



  const value = {
    currentUser,
    currentUserP,
    token,
    login,
    signup,
    logout,
    resetPassword,
    addProfile
  }
  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}
