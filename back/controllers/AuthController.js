import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      login: req.body.login,
      passwordHash: hash,
      avatarURL: req.body.avatarURL,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret777",
      { expiresIn: "30d" },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось зарегистрировать пользователя!");
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Пользователь не найден");

    const isValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
    );
    if (!isValid)
      return res.status(400).json({ message: "Неверный логин или пароль" });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret777",
      { expiresIn: "30d" },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Не удалось авторизоваться" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData });
  } catch (e) {
    console.log(e);
    res.status(500).json("Пользователь не найдет");
  }
};
