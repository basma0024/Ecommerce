import React from 'react'
import style from './home.module.css'
import { Link } from 'react-router-dom'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../About/mainSlider/MainSlider'

export default function Home() {
  return (
    <>
    <MainSlider></MainSlider>
    <CategorySlider></CategorySlider>
   <RecentProducts></RecentProducts>
    
    
    </>
  )
}
