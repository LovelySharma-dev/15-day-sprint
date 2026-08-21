import React from 'react'
import {formatCurrency} from "@monorepqPNPM2/utils"
const page = () => {
  const formattedCurrency = formatCurrency(59.99)
  return (
    <div>
        <h1> Price: {formattedCurrency}</h1>
    </div>
  )
}

export default page