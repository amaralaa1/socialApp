import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <>
<div className="min-h-screen bg-[#1B2328] text-white">
  <Navbar/>
     <Outlet/>
  <Footer/>
   </div>   
   
  
  
  </>
}
