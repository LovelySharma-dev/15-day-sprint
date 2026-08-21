import express from 'express';
import { formatCurrency } from '../shared/src/formatCurrency.js';

const app = express();

app.get("/", (_req, res) => {
    const product = {
        name: "Mechanical Keyboard",
        price: 79.99,
        formattedPrice: formatCurrency(79.99)
    }

    return res.json(product)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})