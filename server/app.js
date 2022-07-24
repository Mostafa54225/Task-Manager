import express from 'express'
import taskRoutes from './routes/tasks.routes.js'
import connection from './db/connect.js'
import dotevn from 'dotenv'
import { notFound } from './middleware/404.js'
import { createError } from './middleware/error.js'
const app = express()

const PORT = process.env.PORT || 5000

dotevn.config()

// middleware
app.use(express.static('./public'))
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}


// routes
app.use('/api/tasks', taskRoutes)
app.use(createError)

app.use(notFound)


const start = async () => {
    try {
        await connection(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()