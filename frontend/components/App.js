import React, { useState, useEffect } from "react"
import data from '../data/data.json'
import axios from "axios"

import Charts from "./Charts"
import Navbar from "./Navbar"
import { useDarkMode } from "../hooks/useDarkMode"

const App = () => {
  const [coinData, setCoinData] = useState([])
  const [isDarkMode, toggleDarkMode] = useDarkMode()

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => {
        setCoinData(res.data)
      })
      .catch(() => {
        console.log('request failed, using fallback data')
        setCoinData(data)
      })
  }, [])
  return (
    <div className={isDarkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={isDarkMode} setDarkMode={toggleDarkMode} />
      <Charts coinData={coinData} />
    </div>
  )
}

export default App
