import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './components/Map'
import './App.css'

function App() {

  return (
    <>

      <Map location={"Ahmedabad"} cordinates={[22.99180142158226, 72.4865308522456]}/>
    </>
  )
}

export default App
