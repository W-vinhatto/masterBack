
import express from 'express'
import routes from './routes'


class App {
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
    }

    routes(){
        this.app.use(routes)
    }
}

// forma de deixar informação disponivel em toda aplicação, aplicação é app

export default new App().app