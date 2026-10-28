import React, { useState } from 'react'
import { useEffect } from 'react';
import api from './api/axios';

const App = () => {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    api.get("/health")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("connection failed"));

  }, []);

  return (
    <div>
      <h1 className='text-4xl font-bold text-blue-600 text-center mt-10 hover:text-purple-600 transition-colors duration-300'>
        hello</h1>
      <p className="text-center mt-4 text-lg">
        Backend Status: {status}
      </p>

    </div>
  )
}

export default App
