import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  RestaurantController,
  AuthController,
  MenuController,
} from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  loginValidation,
  menuValidation,
  registerValidation,
  restValidation,
} from "./validations.js";

mongoose
  .connect(
    "mongodb+srv://admin:vlad9723@cluster0.reb95wv.mongodb.net/restmanage?retryWrites=true&w=majority",
  )
  .then(() => console.log("DB ok"))
  .catch((e) => console.log(e, "DB error"));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server OK");
});

// Авторизация
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  AuthController.register,
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  AuthController.login,
);
app.get("/auth/me", checkAuth, AuthController.getMe);

// CRUD для заведений
app.post(
  "/restaurants",
  checkAuth,
  restValidation,
  RestaurantController.create,
);
app.get("/restaurants", RestaurantController.getAll);
app.get("/restaurants/:id", RestaurantController.getOne);
app.patch("/restaurants/:id", checkAuth, RestaurantController.edit);
app.delete("/restaurants/:id", checkAuth, RestaurantController.remove);

app.get("/tags", RestaurantController.getLastTags);

// CRUD для Menu
app.post("/menu", checkAuth, menuValidation, MenuController.create);
app.get("/menu/:id", MenuController.getMenu);

// Загрузка картинок
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось загрузить картинку");
  }
});

app.listen("4200", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
