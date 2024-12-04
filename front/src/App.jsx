import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, HumanResources, Locations, Purchases, Statistics, StockManagement, TaxInformation, Trasactions, Login } from './views'

function App() {
  const [count, setCount] = useState(0)

  return (
 <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/humanresources" element={<HumanResources />} />
  <Route path="/locations" element={<Locations />} />
  <Route path="/purchases" element={<Purchases />} />
  <Route path="/statistics" element={<Statistics />} />
  <Route path="/stockmanagement" element={<StockManagement />} />
  <Route path="/taxinformation" element={<TaxInformation />} />
  <Route path="/transactions" element={<Trasactions />} />
 </Routes>
  )
}

export default App
