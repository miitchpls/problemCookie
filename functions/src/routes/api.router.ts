import express, { Router } from "express";
import { LoginController } from "../controllers/login.controller";

const ApiRouter: Router = express.Router();

ApiRouter.post("/login", LoginController);

export { ApiRouter };
