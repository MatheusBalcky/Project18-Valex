import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config();

const app = express();





app.get('/test', (req, res) =>{
    res.status(200).send('teste');
})

app.listen(process.env.PORT,  () => console.log(`Server running at port ${process.env.PORT}`) );