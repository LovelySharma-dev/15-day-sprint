import express from "express"
import {formatCurrency} from "@monorepqPNPM2/utils"
const app = express()

app.get("/", (_req, res) => {
    const formattedCurrency = formatCurrency(79.99)


    return res.json({formattedCurrency})
})

const PORT = 3000


app.listen(PORT, () => {
    console.log(`Server started at Port: http://localhost:${PORT}`);
    
})