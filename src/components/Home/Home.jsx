import React from 'react'
import style from './home.module.css'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <>
    <h1>Home</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem.</p>
    <Link to='cart'>Cart</Link> <br />
    <Link to='categories'>Categories</Link> <br />
    <Link to='about'>about</Link>
    
    
    </>
  )
}
