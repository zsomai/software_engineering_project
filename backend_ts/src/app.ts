import express, { Express, Request, Response } from 'express'

import cors from "cors"
import usersRoutes from "./user/routes.js"
import bookRoutes from "./book/routes.js"
import mongoose from 'mongoose';
const app : Express = express()
const PORT = 8001



mongoose.connect("mongodb://localhost:27017/software_engineering_project");
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log("mongodb://localhost:27017/software_engineering_project");

    console.log('Database Connected');
})



app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT))

app.get('/',(req: Request, res : Response)=> {
    res.send('alma');
})

app.use(cors())
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/books", bookRoutes)
