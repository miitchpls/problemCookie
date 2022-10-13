import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import * as functions from "firebase-functions";
import helmet from "helmet";
import responseTime from "response-time";
import { ApiRouter } from "./routes/api.router";

const app: Application = express();

// Secure setting various HTTP headers
app.use(helmet());

// Middleware that records the response time for HTTP requests
app.use(responseTime());

// Enabling receipt of parameters from forms
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling json parsing from request body
app.use(express.json());

// Enabling cookie
app.use(cookieParser());

const corsOptions = {
  origin: ["https://testApp.web.app", "https://testApp.firebaseapp.com"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// Configuring routers
app.use("/api", ApiRouter);

export const backend = functions.region("europe-west6").https.onRequest(app);
