import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import UserController from "./app/controller/UserController";
import SessionController from "./app/controller/SessionController";
import productController from "./app/controller/productController";

const routes = new Router();

const uploads = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/products", uploads.single('file'), productController.store);

export default routes;
