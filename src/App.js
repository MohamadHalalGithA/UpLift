import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'

import './App.css'
import Home from './pages/Home'
import ExcerciseDetail from './pages/ExcerciseDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BMICalculator from "./pages/BMICalculator";



const App = () => {
 
  
  console.log(process.env.RAPIDAPI_EXERCISE_KEY)
  return (
    <div className="app-container">
      <Navbar />
      <Box component="main" className="main-content" width="100%">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExcerciseDetail />} />
          <Route path="/calculator" element={<BMICalculator />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  )
}

export default App
