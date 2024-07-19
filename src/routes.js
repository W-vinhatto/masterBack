import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import authMiddllewares from './app/middelewares/auth'

import UserController from "./app/controller/UserController";
import SessionController from "./app/controller/SessionController";
import productController from "./app/controller/productController";
import CategoryController from "./app/controller/CategoryController";
import OrderController from "./app/controller/OrderController.js";



const routes = new Router();

const uploads = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddllewares)

routes.post("/products", uploads.single('file'), productController.store);
routes.get("/products", productController.index);

routes.post("/categories", CategoryController.store);
routes.get("/categories", CategoryController.index);

routes.post("/order", OrderController.store);





export default routes;
