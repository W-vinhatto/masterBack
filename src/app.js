
import express from "express"
import routes from './routes'
import {resolve} from 'node:path'
// dessa forma aplicação do database é carregado automaticamente
import './database'

class App {
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')))
    }

    routes(){
        this.app.use(routes)
    }
}

// forma de deixar informação disponivel em toda aplicação, aplicação é app

export default new App().app