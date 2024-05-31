import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Create></Create>}></Route>
          <Route path='/read' element={<Read></Read>}></Route>
          <Route path='/read/:id' element={<Update></Update>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App