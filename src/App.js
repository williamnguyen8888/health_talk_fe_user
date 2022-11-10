import React, { Suspense } from 'react'

// ** Router Import
import Router from './router/Router'
import axios from "axios"
axios.defaults.baseURL = "http://localhost:8081"
const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
