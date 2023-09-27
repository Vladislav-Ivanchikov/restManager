import RestaurantModel from "../models/Restaurant.js";

export const create = async (req, res) => {
  try {
    const doc = new RestaurantModel({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      imageURL: req.body.imageURL,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const restaurant = await doc.save();
    res.json(restaurant);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось создать заведение!");
  }
};

export const getAll = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find()
      .populate("user", "login")
      .exec();

    res.json(restaurants);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось загрузить заведения!");
  }
};

export const getOne = async (req, res) => {
  try {
    const restID = req.params.id;
    const rest = await RestaurantModel.findOneAndUpdate(
      { _id: restID },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
    ).populate("user", "login");
    res.json(rest);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось загрузить заведение!");
  }
};

export const remove = async (req, res) => {
  try {
    // Проверка на владельца заведения, если да - тогда удалить !
    const restID = req.params.id;
    await RestaurantModel.findOneAndDelete({ _id: restID });
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось удалить заведение!");
  }
};

export const edit = async (req, res) => {
  try {
    const restID = req.params.id;
    const rest = await RestaurantModel.findOne({ _id: restID });

    if (!rest) {
      return res.status(404).json("Не удалось найти заведение");
    } else {
      await RestaurantModel.updateOne(
        { _id: restID },
        {
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          imageURL: req.body.imageURL,
          tags: req.body.tags.split(","),
        },
      );
      res.json({
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось изменить поле заведения!");
  }
};

export const getLastTags = async (req, res) => {
  try {
    const rest = await RestaurantModel.find().exec();
    const tags = rest
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось загрузить тэги!");
  }
};
