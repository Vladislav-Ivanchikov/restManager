import MenuModel from "../models/Menu.js";

export const create = async (req, res) => {
  try {
    const doc = new MenuModel({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      imageURL: req.body.imageURL,
      ingredients: req.body.ingredients.split(","),
      restaurant: req.body.restaurant,
    });

    const dish = await doc.save();
    console.log(dish);

    res.json(dish);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось создать блюдо!");
  }
};

// export const getAll = async (req, res) => {
//   try {
//     const restaurants = await MenuModel.find().populate("user", "login").exec();
//
//     res.json(restaurants);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json("Не удалось загрузить заведения!");
//   }
// };

export const getMenu = async (req, res) => {
  try {
    const restID = req.params.id;
    const menu = await MenuModel.find({ restaurant: restID });
    res.json(menu);
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось загрузить меню!");
  }
};

export const remove = async (req, res) => {
  try {
    // Проверка на владельца заведения, если да - тогда удалить !
    const restID = req.params.id;
    await MenuModel.findOneAndDelete({ _id: restID });
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json("Не удалось удалить заведение!");
  }
};

export const edit = async (req, res) => {
  try {
    const restID = req.params.id;
    const rest = await MenuModel.findOne({ _id: restID });

    if (!rest) {
      return res.status(404).json("Не удалось найти заведение");
    } else {
      await MenuModel.updateOne(
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
