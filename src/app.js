
import express from "express"
import routes from './routes'
import {resolve} from 'node:path'
import cors from 'cors'
// dessa forma aplicação do database é carregado automaticamente
import './database'

class App {
    constructor(){
        this.app = express()
        this.app.use(cors())

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')))
        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')))
    }

    routes(){
        this.app.use(routes)
    }
}

// forma de deixar informação disponivel em toda aplicação, aplicação é app

export default new App().app