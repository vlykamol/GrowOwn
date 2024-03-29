import axios from 'axios'
import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentuser] = useState()
  const [currentUserP, setCurrentuserP] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')

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
        // .post("http://localhost:5000/profile/addUser", user)
        .post("https://growownserver.herokuapp.com/profile/addUser", user)
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
      setCurrentuser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user.getIdToken().then(token => {
        console.log('token', token);
        setToken(token)
      })
    })
  },[currentUser])

  useEffect(()=>{
    async function fetchData() {
      await axios
        .get(`https://growownserver.herokuapp.com/profile/getUser/${currentUser.uid}`,
        {
          headers:{
            token: "Bearer " + token
          }
        }
        )
        .then((res) => {
          currentUser.role = res.data.role;
          setCurrentuserP(res.data);
        });
    }
    fetchData()
  },[currentUser])



  const value = {
    currentUser,
    currentUserP,
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