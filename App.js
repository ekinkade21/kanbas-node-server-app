import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import cors from "cors";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
app.listen(4000);
